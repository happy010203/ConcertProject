package com.example.backend.Exception;

/**
 * 自訂異常類別，表示無效的 JWT 令牌。
 */
public class InvalidTokenException extends RuntimeException {
    // 序列化版本 ID，用於序列化過程中的版本控制
    private static final long serialVersionUID = 1L;

    /**
     * 使用指定的錯誤訊息建立一個 InvalidTokenException 例外。
     * 
     * @param message 錯誤訊息，用於描述異常的詳細信息
     */
    public InvalidTokenException(String message) {
        super(message); // 呼叫父類別的建構子來設定錯誤訊息
    }

    /**
     * 使用指定的錯誤訊息和根本原因建立一個 InvalidTokenException 例外。
     * 
     * @param message 錯誤訊息，用於描述異常的詳細信息
     * @param cause 原始的錯誤原因，通常是另一個異常
     */
    public InvalidTokenException(String message, Throwable cause) {
        super(message, cause); // 呼叫父類別的建構子來設定錯誤訊息和原因
    }
}
