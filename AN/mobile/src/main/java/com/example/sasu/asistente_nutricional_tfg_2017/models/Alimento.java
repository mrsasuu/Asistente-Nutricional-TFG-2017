package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.Grupo;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.Porcion;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.SubGrupo;
import com.orm.SugarRecord;
import com.orm.dsl.Unique;

/**
 * Created by Sasu on 06/06/2017.
 */

public class Alimento extends SugarRecord{
    private Grupo grupoAlimentario;
    private SubGrupo categoria;

    @Unique
    private String id;
    private String nombre;
    private String urlImagen;
    //private Porcion porcion;
    private double porcion; // Debe ser 1, 0.75, 0.5 o 0.25 donde 1 significa todo el plato, 0.75 significa tres cuartos del plato etc.

    //Macronutrientes
    private double proteinas;
    private double carbohidratos;
    private double grasas;

    public Alimento(String id, String nombre, String urlImagen, double porcion, double proteinas, double carbohidratos, double grasas, Grupo grupoAlimentario, SubGrupo categoria){
        this.id = id;
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.porcion = porcion;
        this.proteinas = proteinas;
        this.carbohidratos = carbohidratos;
        this.grasas = grasas;
        this.grupoAlimentario = grupoAlimentario;
        this.categoria = categoria;
    }

    public String getNombre() {
        return nombre;
    }

    public String getIdAl() {
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
