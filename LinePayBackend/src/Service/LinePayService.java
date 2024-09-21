package com.example.MyJBA.Service;

import java.util.Map;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;
import java.util.UUID;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.example.MyJBA.dao.LinePayCheckoutPaymentRequestFormRepository;
import com.example.MyJBA.entity.LinePayCheckoutPaymentRequestForm;
import com.example.MyJBA.entity.LinePayProductForm;
import com.example.MyJBA.entity.LinePayProductPackageForm;
import com.example.MyJBA.entity.LinePayRedirectUrls;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

// LINEPAY可成功串接 (備份)
// @Service
// public class LinePayService {
//     @Autowired
//     private LinePayCheckoutPaymentRequestFormRepository repository;

//     @Autowired
//     private RestTemplate restTemplate;

//     @Autowired
//     private HallsRepositoryDAO hallsRepositoryDAO;

//     //存入資料庫
//     public void saveCheckoutPaymentRequest(Map<String, Object> requestBody) {
//         LinePayCheckoutPaymentRequestForm checkoutForm = new LinePayCheckoutPaymentRequestForm();

//         // 假設 requestData 中包含 hall 的數據
//         // 這是來自前端的數據，確保有 hall 信息
//         // Halls hall = findHallById((Integer) requestBody.get("hall_id"));
//         // if (hall != null) {
//         //     checkoutForm.setHall(hall); // 設置 Hall
//         // } else {
//         //     throw new IllegalArgumentException("Hall is missing in request data.");
//         // }

//         checkoutForm.setAmount(new BigDecimal((Integer) requestBody.get("amount")));
//         checkoutForm.setOrderId((String) requestBody.get("orderId"));
//         checkoutForm.setCurrency((String) requestBody.get("currency"));

//         LinePayRedirectUrls redirectUrls = new LinePayRedirectUrls(); 
//         redirectUrls.setConfirmUrl(requestBody.get("confirmUrl").toString());
//         checkoutForm.setRedirectUrls(redirectUrls); 

//         List<Map<String, Object>> packagesData = (List<Map<String, Object>>) requestBody.get("packages");

//         List<LinePayProductPackageForm> packages = packagesData.stream().map(packageData -> {
//             LinePayProductPackageForm productPackage = new LinePayProductPackageForm();
//             productPackage.setName((String) packageData.get("name"));
//             productPackage.setAmount(new BigDecimal((Integer) packageData.get("amount")));

//             List<Map<String, Object>> productsData = (List<Map<String, Object>>) packageData.get("products");

//             List<LinePayProductForm> products = productsData.stream().map(productData -> {
//                 LinePayProductForm productForm = new LinePayProductForm();
//                 productForm.setName((String) productData.get("name"));
//                 productForm.setQuantity(new BigDecimal((Integer) productData.get("quantity")));
//                 productForm.setPrice(new BigDecimal((Integer) productData.get("price")));
//                 return productForm;
//             }).collect(Collectors.toList());

//             productPackage.setProducts(products);
//             return productPackage;
//         }).collect(Collectors.toList());

//         checkoutForm.setPackages(packages);
//         repository.save(checkoutForm);
//     }

//     // private Halls findHallById(Integer hallId) {
//     //     // 實現查找 hall 的邏輯，可能通過 repository
//     //     Optional<Halls> hall = hallsRepositoryDAO.findById(hallId);
//     //     return hall.orElse(null); // 根據需要處理 null 的情況
//     // }

//     public static String encrypt(final String keys, final String data) {
//         // HmacUtils.getHmacSha256已被棄用，故改HmacUtils.getInitializedMac方法
//         return toBase64String(HmacUtils.getInitializedMac(
//                 HmacAlgorithms.HMAC_SHA_256,
//                 keys.getBytes())
//                 .doFinal(data.getBytes()));
//     }

//     public static String toBase64String(byte[] bytes) {
//         byte[] byteArray = Base64.encodeBase64(bytes);
//         return new String(byteArray);
//     }

//     // 查詢資料庫，才能丟到controller與前端串接
//     public Map<String, Object> getCheckoutPaymentDetails(String orderId) {
//         Optional<LinePayCheckoutPaymentRequestForm> optionalForm = repository.findByOrderId(orderId);
//         //要用LinkedHashMap，而不是HashMap是因為json順序問題會影響資料經過加密或使用 HMAC、數字簽名進行驗證
//         Map<String, Object> result = new LinkedHashMap<>();

//         if (optionalForm.isPresent()) {
//             LinePayCheckoutPaymentRequestForm form = optionalForm.get();

//             // 取得基本訊息
//             // String orderId = String.valueOf(form.getId());
//             result.put("amount", form.getAmount());
//             result.put("currency", form.getCurrency());
            
//             // 預設為 TWD
//             // result.put("currency", "TWD");
//             result.put("orderId", form.getOrderId());

//             // 取得 RedirectUrls 
//             LinePayRedirectUrls redirectUrls = form.getRedirectUrls();
//             if (redirectUrls != null) {
//                 Map<String, Object> redirectUrlsMap = new LinkedHashMap<>();
//                 redirectUrlsMap.put("confirmUrl", redirectUrls.getConfirmUrl());

//                 // // 預設為 https://www.google.com.tw
//                 // redirectUrlsMap.put("confirmUrl", "https://www.google.com.tw");
//                 redirectUrlsMap.put("cancelUrl", null);//先預設為null
//                 result.put("redirectUrls", redirectUrlsMap);
//             } else {
//                 result.put("error", "RedirectUrls is null for CheckoutPaymentRequestForm ID: " + orderId);
//             }

//             // 取得 ProductPackageForm 和 ProductForm 
//             List<Map<String, Object>> productPackages = form.getPackages().stream()
//                     .map(packageForm -> {
//                         Map<String, Object> packageDetails = new LinkedHashMap<>();
//                         String packageId = String.valueOf(packageForm.getId());
//                         packageDetails.put("id", packageId);
//                         packageDetails.put("name", packageForm.getName());//官方不一定要
//                         packageDetails.put("amount", packageForm.getAmount());

//                         // 取得 ProductForm 
//                         List<Map<String, Object>> products = packageForm.getProducts().stream()
//                                 .map(productForm -> {
//                                     Map<String, Object> productDetails = new LinkedHashMap<>();
//                                     String productId = String.valueOf(productForm.getId());
//                                     productDetails.put("id", productId);
//                                     productDetails.put("name", productForm.getName());
//                                     productDetails.put("imageUrl", productForm.getImageUrl());
//                                     productDetails.put("quantity", productForm.getQuantity());
//                                     productDetails.put("price", productForm.getPrice());
//                                     return productDetails;
//                                 })
//                                 .collect(Collectors.toList());

//                         packageDetails.put("products", products);
//                         return packageDetails;
//                     })
//                     .collect(Collectors.toList());

//             result.put("packages", productPackages);

//         } else {
//             result.put("error", "CheckoutPaymentRequestForm not found for ID: " + orderId);
//         }

//         return result;
//     }

//     public Map<String, Object> sendPaymentRequest(Map<String, Object> result) {
//         ObjectMapper mapper = new ObjectMapper();
//         String nonce = UUID.randomUUID().toString();
//         String ChannelId = "1234"; // 測試用的 Channel ID
//         String ChannelSecret = "5678"; // 測試用的 Channel Secret
//         String requestUri = "/v3/payments/request";
//         String deviceType = "PC";

//         try {
//             String body = mapper.writeValueAsString(result);
//             System.out.println("body: " + body);
//             System.out.println("nonce: " + nonce);
//             String signature = encrypt(ChannelSecret,
//                     ChannelSecret + requestUri + body + nonce);
//             System.out.println("signature: " + signature);

//             // 準備 Request Body 和 Headers
//             HttpHeaders headers = new HttpHeaders();
//             headers.setContentType(MediaType.APPLICATION_JSON);
//             headers.add("X-LINE-ChannelId", ChannelId); 
//             headers.add("X-LINE-Authorization-Nonce", nonce);
//             headers.add("X-LINE-Authorization", signature);
//             headers.add("X-LINE-MerchantDeviceType", deviceType);

//             // 創建 HttpEntity
//             HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(result, headers);

//             // 發送 POST 請求
//             String url = "https://sandbox-api-pay.line.me/v3/payments/request";
//             ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

//             // 處理響應
//             if (response.getStatusCode().is2xxSuccessful()) {
//                 return Map.of("status", "success", "response", response.getBody());
//             } else {
//                 return Map.of("status", "failed", "error", "Failed to send request");
//             }

//         } catch (JsonProcessingException e) {
//             e.printStackTrace();
//             return Map.of("status", "failed", "error", "JSON Processing Error");
//         } catch (RestClientException e) {
//             e.printStackTrace();
//             return Map.of("status", "failed", "error", e.getMessage());
//         }
//     }

// }


@Service
public class LinePayService {
    @Autowired
    private LinePayCheckoutPaymentRequestFormRepository repository;

    @Autowired
    private RestTemplate restTemplate;

    //存入資料庫
    public void saveCheckoutPaymentRequest(Map<String, Object> requestBody) {
        LinePayCheckoutPaymentRequestForm checkoutForm = new LinePayCheckoutPaymentRequestForm();

        checkoutForm.setAmount(new BigDecimal((Integer) requestBody.get("amount")));
        checkoutForm.setOrderId((String) requestBody.get("orderId"));
        checkoutForm.setCurrency((String) requestBody.get("currency"));

        LinePayRedirectUrls redirectUrls = new LinePayRedirectUrls(); 
        redirectUrls.setConfirmUrl(requestBody.get("confirmUrl").toString());
        checkoutForm.setRedirectUrls(redirectUrls); 

        List<Map<String, Object>> packagesData = (List<Map<String, Object>>) requestBody.get("packages");

        List<LinePayProductPackageForm> packages = packagesData.stream().map(packageData -> {
            LinePayProductPackageForm productPackage = new LinePayProductPackageForm();
            productPackage.setName((String) packageData.get("name"));
            productPackage.setAmount(new BigDecimal((Integer) packageData.get("amount")));

            List<Map<String, Object>> productsData = (List<Map<String, Object>>) packageData.get("products");

            List<LinePayProductForm> products = productsData.stream().map(productData -> {
                LinePayProductForm productForm = new LinePayProductForm();
                productForm.setName((String) productData.get("name"));
                productForm.setQuantity(new BigDecimal((Integer) productData.get("quantity")));
                productForm.setPrice(new BigDecimal((Integer) productData.get("price")));
                return productForm;
            }).collect(Collectors.toList());

            productPackage.setProducts(products);
            return productPackage;
        }).collect(Collectors.toList());

        checkoutForm.setPackages(packages);
        repository.save(checkoutForm);
    }

    public static String encrypt(final String keys, final String data) {
        // HmacUtils.getHmacSha256已被棄用，故改HmacUtils.getInitializedMac方法
        return toBase64String(HmacUtils.getInitializedMac(
                HmacAlgorithms.HMAC_SHA_256,
                keys.getBytes())
                .doFinal(data.getBytes()));
    }

    public static String toBase64String(byte[] bytes) {
        byte[] byteArray = Base64.encodeBase64(bytes);
        return new String(byteArray);
    }

    // 查詢資料庫，才能丟到controller與前端串接
    public Map<String, Object> getCheckoutPaymentDetails(String orderId) {
        Optional<LinePayCheckoutPaymentRequestForm> optionalForm = repository.findByOrderId(orderId);
        //要用LinkedHashMap，而不是HashMap是因為json順序問題會影響資料經過加密或使用 HMAC、數字簽名進行驗證
        Map<String, Object> result = new LinkedHashMap<>();

        if (optionalForm.isPresent()) {
            LinePayCheckoutPaymentRequestForm form = optionalForm.get();

            // 取得基本訊息
            // String orderId = String.valueOf(form.getId());
            result.put("amount", form.getAmount());
            result.put("currency", form.getCurrency());
            
            // 預設為 TWD
            // result.put("currency", "TWD");
            result.put("orderId", form.getOrderId());

            // 取得 RedirectUrls 
            LinePayRedirectUrls redirectUrls = form.getRedirectUrls();
            if (redirectUrls != null) {
                Map<String, Object> redirectUrlsMap = new LinkedHashMap<>();
                redirectUrlsMap.put("confirmUrl", redirectUrls.getConfirmUrl());

                // // 預設為 https://www.google.com.tw
                // redirectUrlsMap.put("confirmUrl", "https://www.google.com.tw");
                redirectUrlsMap.put("cancelUrl", null);//先預設為null
                result.put("redirectUrls", redirectUrlsMap);
            } else {
                result.put("error", "RedirectUrls is null for CheckoutPaymentRequestForm ID: " + orderId);
            }

            // 取得 ProductPackageForm 和 ProductForm 
            List<Map<String, Object>> productPackages = form.getPackages().stream()
                    .map(packageForm -> {
                        Map<String, Object> packageDetails = new LinkedHashMap<>();
                        String packageId = String.valueOf(packageForm.getId());
                        packageDetails.put("id", packageId);
                        packageDetails.put("name", packageForm.getName());//官方不一定要
                        packageDetails.put("amount", packageForm.getAmount());

                        // 取得 ProductForm 
                        List<Map<String, Object>> products = packageForm.getProducts().stream()
                                .map(productForm -> {
                                    Map<String, Object> productDetails = new LinkedHashMap<>();
                                    String productId = String.valueOf(productForm.getId());
                                    productDetails.put("id", productId);
                                    productDetails.put("name", productForm.getName());
                                    productDetails.put("imageUrl", productForm.getImageUrl());
                                    productDetails.put("quantity", productForm.getQuantity());
                                    productDetails.put("price", productForm.getPrice());
                                    return productDetails;
                                })
                                .collect(Collectors.toList());

                        packageDetails.put("products", products);
                        return packageDetails;
                    })
                    .collect(Collectors.toList());

            result.put("packages", productPackages);

        } else {
            result.put("error", "CheckoutPaymentRequestForm not found for ID: " + orderId);
        }

        return result;
    }

    public Map<String, Object> sendPaymentRequest(Map<String, Object> result) {
        ObjectMapper mapper = new ObjectMapper();
        String nonce = UUID.randomUUID().toString();
        String ChannelId = "1234"; // 測試用的 Channel ID
        String ChannelSecret = "5678"; // 測試用的 Channel Secret
        String requestUri = "/v3/payments/request";
        String deviceType = "PC";

        try {
            String body = mapper.writeValueAsString(result);
            System.out.println("body: " + body);
            System.out.println("nonce: " + nonce);
            String signature = encrypt(ChannelSecret,
                    ChannelSecret + requestUri + body + nonce);
            System.out.println("signature: " + signature);

            // 準備 Request Body 和 Headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("X-LINE-ChannelId", ChannelId); 
            headers.add("X-LINE-Authorization-Nonce", nonce);
            headers.add("X-LINE-Authorization", signature);
            headers.add("X-LINE-MerchantDeviceType", deviceType);

            // 創建 HttpEntity
            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(result, headers);

            // 發送 POST 請求
            String url = "https://sandbox-api-pay.line.me/v3/payments/request";
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

            // 處理響應
            if (response.getStatusCode().is2xxSuccessful()) {
                return Map.of("status", "success", "response", response.getBody());
            } else {
                return Map.of("status", "failed", "error", "Failed to send request");
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return Map.of("status", "failed", "error", "JSON Processing Error");
        } catch (RestClientException e) {
            e.printStackTrace();
            return Map.of("status", "failed", "error", e.getMessage());
        }
    }

}