package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.orm.SugarRecord;

/**
 * Created by Sasu on 28/08/2017.
 */

public class Objetivo extends SugarRecord {
    @SerializedName("FOODID")
    @Expose
    private int FOODID;
    @SerializedName("FOODNAME")
    @Expose
    private String FOODNAME;
    @SerializedName("FOODHOUR")
    @Expose
    private String FOODHOUR;
    @SerializedName("PHOTO")
    @Expose
    private String PHOTO;
    @SerializedName("AMOUNT")
    @Expose
    private double AMOUNT;
    @SerializedName("STARTDATE")
    @Expose
    private long STARTDATE;
    @SerializedName("ENDDATE")
    @Expose
    private double ENDDATE;

    @SerializedName("PROGRESS")
    @Expose
    private double PROGRESS;

    public Objetivo() {
    }

    public Objetivo(int FOODID, String FOODNAME, String FOODHOUR, String PHOTO, double AMOUNT, long STARTDATE, double ENDDATE, double PROGRESS) {
        this.FOODID = FOODID;
        this.FOODNAME = FOODNAME;
        this.FOODHOUR = FOODHOUR;
        this.PHOTO = PHOTO;
        this.AMOUNT = AMOUNT;
        this.STARTDATE = STARTDATE;
        this.ENDDATE = ENDDATE;
        this.PROGRESS = PROGRESS;
    }

    public double getPROGRESS() {
        return PROGRESS;
    }

    public void setPROGRESS(double PROGRESS) {
        this.PROGRESS = PROGRESS;
    }

    public String getFOODNAME() {
        return FOODNAME;
    }

    public void setFOODNAME(String FOODNAME) {
        this.FOODNAME = FOODNAME;
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

    public String getPHOTO() {
        return PHOTO;
    }

    public void setPHOTO(String PHOTO) {
        this.PHOTO = PHOTO;
    }

    public double getAMOUNT() {
        return AMOUNT;
    }

    public void setAMOUNT(double AMOUNT) {
        this.AMOUNT = AMOUNT;
    }

    public long getSTARTDATE() {
        return STARTDATE;
    }

    public void setSTARTDATE(long STARTDATE) {
        this.STARTDATE = STARTDATE;
    }

    public double getENDDATE() {
        return ENDDATE;
    }

    public void setENDDATE(double ENDDATE) {
        this.ENDDATE = ENDDATE;
    }
}
