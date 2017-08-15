package com.example.sasu.asistente_nutricional_tfg_2017.models;

/**
 * Objeto plano Java para representar afiliados
 */
public class Patient {

    private int ID;
    private String NAME;
    private String SURNAME;
    private String USERNAME;
    private int NEWS;
    private int NUTRITIONIST_ID;
    private String TOKEN;

    public Patient(int ID, String NAME, String SURNAME, String USERNAME, int NEWS, int NUTRITIONIST_ID, String TOKEN) {
        this.ID = ID;
        this.NAME = NAME;
        this.SURNAME = SURNAME;
        this.USERNAME = USERNAME;
        this.NEWS = NEWS;
        this.NUTRITIONIST_ID = NUTRITIONIST_ID;
        this.TOKEN = TOKEN;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getNAME() {
        return NAME;
    }

    public void setNAME(String NAME) {
        this.NAME = NAME;
    }

    public String getSURNAME() {
        return SURNAME;
    }

    public void setSURNAME(String SURNAME) {
        this.SURNAME = SURNAME;
    }

    public String getUSERNAME() {
        return USERNAME;
    }

    public void setUSERNAME(String USERNAME) {
        this.USERNAME = USERNAME;
    }

    public int getNEWS() {
        return NEWS;
    }

    public void setNEWS(int NEWS) {
        this.NEWS = NEWS;
    }

    public int getNUTRITIONIST_ID() {
        return NUTRITIONIST_ID;
    }

    public void setNUTRITIONIST_ID(int NUTRITIONIST_ID) {
        this.NUTRITIONIST_ID = NUTRITIONIST_ID;
    }

    public String getTOKEN() {
        return TOKEN;
    }

    public void setTOKEN(String TOKEN) {
        this.TOKEN = TOKEN;
    }
}
