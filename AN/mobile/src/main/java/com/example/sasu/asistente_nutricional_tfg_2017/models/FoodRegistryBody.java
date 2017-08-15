package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.google.gson.annotations.SerializedName;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

//import java.sql.Date;
import java.util.Calendar;

/**
 * Objeto plano Java para representar el cuerpo de la petición POST
 */
public class FoodRegistryBody {
    @SerializedName("id")
    private int id;
    private String date;

    public FoodRegistryBody(int id) {
        this.id = id;


        Date date = Calendar.getInstance().getTime();

        DateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        this.date = formatter.format(date);



    }

    public FoodRegistryBody(int id, String date) {
        this.id = id;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
