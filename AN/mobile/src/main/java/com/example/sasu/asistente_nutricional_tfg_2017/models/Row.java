package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.google.gson.annotations.SerializedName;

/**
 * Objeto plano Java para representar el cuerpo de la petición POST
 */
public class Row {
    @SerializedName("rows")
    private int rows;

    public Row() {
    }

    public Row(int rows) {
        this.rows = rows;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }
}
