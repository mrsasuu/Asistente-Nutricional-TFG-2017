package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.google.gson.annotations.SerializedName;

import java.sql.Date;

/**
 * Objeto plano Java para representar el cuerpo de la petición POST
 */
public class Row {
    @SerializedName("ROWS")
    private int ROWS;
    private String TIME;
    private String ERROR;


    public Row() {
    }

    public Row(int ROWS, String ERROR) {
        this.ROWS = ROWS;
        this.ERROR = ERROR;
    }

    public Row(int ROWS,  String TIME, String ERROR) {
        this.ROWS = ROWS;
        this.ERROR = ERROR;
        this.TIME =  TIME;
    }

    public int getROWS() {
        return ROWS;
    }

    public String getTIME() {
        return TIME;
    }

    public void setTIME(String TIME) {
        this.TIME = TIME;
    }

    public void setROWS(int ROWS) {
        this.ROWS = ROWS;
    }

    public String getERROR() {
        return ERROR;
    }

    public void setERROR(String ERROR) {
        this.ERROR = ERROR;
    }
}
