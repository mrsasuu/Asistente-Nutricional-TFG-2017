package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class AlimentosResponse {
    @SerializedName("al")
    private List<Alimento> al;

    public AlimentosResponse() {
    }
/*
    public AlimentosResponse(int NEWS, String ERROR) {
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
    }*/
}
