package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.google.gson.annotations.SerializedName;

/**
 * Objeto plano Java para representar el cuerpo de la petición POST
 */
public class Response {
    @SerializedName("MSG")
    private String MSG;
    private String TIME;
    private String ERROR;

    public Response() {
    }

    public Response(String MSG, String TIME, String ERROR) {
        this.MSG = MSG;
        this.TIME = TIME;
        this.ERROR = ERROR;
    }

    public String getMSG() {
        return MSG;
    }

    public void setMSG(String MSG) {
        this.MSG = MSG;
    }

    public String getTIME() {
        return TIME;
    }

    public void setTIME(String TIME) {
        this.TIME = TIME;
    }

    public String getERROR() {
        return ERROR;
    }

    public void setERROR(String ERROR) {
        this.ERROR = ERROR;
    }
}
