package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.Grupo;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.Porcion;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.SubGrupo;

/**
 * Created by Sasu on 06/06/2017.
 */

public class Alimento {
    private Grupo grupoAlimentario;
    private SubGrupo categoria;
    private String id;
    private String nombre;
    private String urlImagen;
    //private Porcion porcion;
    private double porcion; // Debe ser 1, 0.75, 0.5 o 0.25 donde 1 significa todo el plato, 0.75 significa tres cuartos del plato etc.

    //Macronutrientes
    private double proteinas;
    private double carbohidratos;
    private double grasas;

    public String getNombre() {
        return nombre;
    }

    public String getId() {
        return id;
    }

    public String getGrupo() {
        return grupoAlimentario.toString();
    }

    public String getSub_Grupo() {
        return categoria.toString();
    }

    public double getPorcion() {
        return porcion;
    }

    public double getProteinas() {
        return proteinas;
    }

    public double getCarbohidratos() {
        return carbohidratos;
    }

    public double getGrasas() {
        return grasas;
    }

    public String getUrl() {
        return urlImagen;
    }

    //Micronutrientes como vitaminas, sales minerales
    //FALTA POR IMPLEMENTAR EL RESTO DE ELEMENTOS



}
