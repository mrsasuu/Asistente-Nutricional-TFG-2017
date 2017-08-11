package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.google.gson.annotations.SerializedName;

/**
 * Objeto plano Java para representar el cuerpo de la petición POST
 */
public class LoginBody {
    @SerializedName("id")
    private String userId;
    private String password;

    public LoginBody(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
