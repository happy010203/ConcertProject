package com.example.backend.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Entity.Order;
import com.example.backend.Service.PaymentService;

@RestController
@RequestMapping("/ecpay")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PaymentResultController {

	@Autowired
	private PaymentService payService;

	@PostMapping("/paymentResult")
	public ResponseEntity<String> handleServerPostRequest(@RequestParam Map<String, String> params) {
		// 从请求中获取参数
		String merchantTradeNo = params.get("MerchantTradeNo");
		String merchantTradeDate = params.get("MerchantTradeDate");

		// Debug log for incoming parameters
		System.out.println("Received MerchantTradeNo (Server POST): " + merchantTradeNo);
		System.out.println("Received MerchantTradeDate (Server POST): " + merchantTradeDate);

		// 检查是否缺少必要的参数
		if (merchantTradeNo == null || merchantTradeDate == null) {
			return ResponseEntity.badRequest().body("请求参数中缺少 MerchantTradeNo 或 MerchantTradeDate");
		}

		// 将 MerchantTradeDate 转换为 LocalDateTime
		LocalDateTime parsedMerchantTradeDate = null;
		try {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			parsedMerchantTradeDate = LocalDateTime.parse(merchantTradeDate, formatter);
		} catch (DateTimeParseException e) {
			return ResponseEntity.badRequest().body("MerchantTradeDate 的日期格式无效，应为：yyyy/MM/dd HH:mm:ss");
		}

		try {
			// 获取订单记录
			Order orderData = payService.getOrderDetails(Integer.parseInt(merchantTradeNo));

			// 更新支付数据
			payService.updatePaydata(orderData, parsedMerchantTradeDate, "綠界金流", "已付款");

			// 返回1|OK给ECPay，表示成功处理
			return ResponseEntity.ok("1|OK");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("更新支付数据时发生错误");
		}
	}

	@PostMapping("/orderResult")
    public ResponseEntity<String> handleClientPostRequest(@RequestParam Map<String, String> params) {
        // 从请求中获取参数
        String merchantTradeNo = params.get("MerchantTradeNo");
        String merchantTradeDate = params.get("MerchantTradeDate");

        // Debug log for incoming parameters
        System.out.println("Received MerchantTradeNo (Client POST): " + merchantTradeNo);
        System.out.println("Received MerchantTradeDate (Client POST): " + merchantTradeDate);

        // 检查是否缺少必要的参数
        if (merchantTradeNo == null || merchantTradeDate == null) {
            return ResponseEntity.badRequest().body("请求参数中缺少 MerchantTradeNo 或 MerchantTradeDate");
        }

        // 将 MerchantTradeDate 转换为 LocalDateTime
        LocalDateTime parsedMerchantTradeDate = null;
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            parsedMerchantTradeDate = LocalDateTime.parse(merchantTradeDate, formatter);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("MerchantTradeDate 的日期格式无效，应为：yyyy/MM/dd HH:mm:ss");
        }

        try {
        	
        	Order order = payService.getOrderDetails(Integer.parseInt(merchantTradeNo));
            
            // 更新订单状态为已支付
            payService.updateOrder(order.getOrderNumber(), null, null, null, null, true);
            // 构建重定向 URL 到前端 React 页面，包含交易参数
            String redirectUrl = "http://localhost:3000/PaymentResultPage?MerchantTradeNo=" + merchantTradeNo
                                 + "&MerchantTradeDate=" + merchantTradeDate;
            String htmlResponse = "<html><body><script>window.location.href = '" + redirectUrl + "';</script></body></html>";
            return ResponseEntity.ok(htmlResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("处理客户端请求时发生错误");
        }
    }
}