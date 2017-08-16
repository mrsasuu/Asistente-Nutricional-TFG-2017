package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.google.gson.annotations.SerializedName;

import java.sql.Date;

/**
 * Objeto plano Java para representar el cuerpo de la petición POST
 */
public class Registros {
    @SerializedName("PATIENTID")
    private int PATIENTID;
    private int FOODID;
    private String FOODHOUR;
    private long DATE;
    private double AMOUNT;
    private Long CREATETIME;

    public Registros() {
    }

    public Registros(int PATIENTID, int FOODID, String FOODHOUR, long DATE, double AMOUNT, Long CREATETIME) {
        this.PATIENTID = PATIENTID;
        this.FOODID = FOODID;
        this.FOODHOUR = FOODHOUR;
        this.DATE = DATE;
        this.AMOUNT = AMOUNT;
        this.CREATETIME = CREATETIME;
    }

    public int getPATIENTID() {
        return PATIENTID;
    }

    public void setPATIENTID(int PATIENTID) {
        this.PATIENTID = PATIENTID;
    }

    public int getFOODID() {
        return FOODID;
    }

    public void setFOODID(int FOODID) {
        this.FOODID = FOODID;
    }

    public String getFOODHOUR() {
        return FOODHOUR;
    }

    public void setFOODHOUR(String FOODHOUR) {
        this.FOODHOUR = FOODHOUR;
    }

    public long getDATE() {
        return DATE;
    }

    public void setDATE(long DATE) {
        this.DATE = DATE;
    }

    public double getAMOUNT() {
        return AMOUNT;
    }

    public void setAMOUNT(double AMOUNT) {
        this.AMOUNT = AMOUNT;
    }

    public Long getCREATETIME() {
        return CREATETIME;
    }

    public void setCREATETIME(Long CREATETIME) {
        this.CREATETIME = CREATETIME;
    }
}
