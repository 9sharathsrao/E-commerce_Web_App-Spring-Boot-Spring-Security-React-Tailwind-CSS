package com.jsp.clinkNBuy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@AllArgsConstructor
@Getter
@Setter
public class ResponseDto {
	private int status;
    private String message;
    private Object data;
    
 // Manual constructor often used in your controllers
    public ResponseDto(String message, Object data) {
        this.message = message;
        this.data = data;
    }
}
