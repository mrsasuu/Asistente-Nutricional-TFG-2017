package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.google.gson.annotations.SerializedName;

public class News {
    @SerializedName("NEWS")
    private int NEWS;
    private String ERROR;

    public News() {
    }

    public News(int NEWS, String ERROR) {
        this.NEWS = NEWS;
        this.ERROR = ERROR;
    }

    public int getNEWS() {
        return NEWS;
    }

    public void setNEWS(int NEWS) {
        this.NEWS = NEWS;
    }

    public String getERROR() {
        return ERROR;
    }

    public void setERROR(String ERROR) {
        this.ERROR = ERROR;
    }
}
