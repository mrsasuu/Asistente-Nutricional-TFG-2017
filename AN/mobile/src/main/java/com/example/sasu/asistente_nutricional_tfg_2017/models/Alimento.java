package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.Grupo;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.SubGrupo;
import com.orm.SugarRecord;
import com.orm.dsl.Unique;

/**
 * Created by Sasu on 06/06/2017.
 */

public class Alimento extends SugarRecord{
    private Grupo grupo_alimentario;
    private SubGrupo categoria;


    //private Long id;
    private String nombre;
    private String url_imagen;
    //private Porcion porcion;
    private double porcion; // Debe ser 1, 0.75, 0.5 o 0.25 donde 1 significa todo el plato, 0.75 significa tres cuartos del plato etc.

    //Macronutrientes
    private double proteinas;
    private double carbohidratos;
    private double grasas;

    PrioridadComida prioridad;


    public Alimento() {
    }

    public Grupo getGrupo_alimentario() {
        return grupo_alimentario;
    }

    public void setGrupo_alimentario(Grupo grupo_alimentario) {
        this.grupo_alimentario = grupo_alimentario;
    }

    public SubGrupo getCategoria() {
        return categoria;
    }

    public void setCategoria(SubGrupo categoria) {
        this.categoria = categoria;
    }
/*
    public Long getIde() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }*/

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUrl_imagen() {
        return url_imagen;
    }

    public void setUrl_imagen(String url_imagen) {
        this.url_imagen = url_imagen;
    }

    public void setPorcion(double porcion) {
        this.porcion = porcion;
    }

    public void setProteinas(double proteinas) {
        this.proteinas = proteinas;
    }

    public void setCarbohidratos(double carbohidratos) {
        this.carbohidratos = carbohidratos;
    }

    public void setGrasas(double grasas) {
        this.grasas = grasas;
    }

    public Alimento(Long id, String nombre, String url_imagen, double porcion, double proteinas, double carbohidratos, double grasas, Grupo grupo_alimentario, SubGrupo categoria){
        //this.id = id;
        this.nombre = nombre;
        this.url_imagen = url_imagen;
        this.porcion = porcion;
        this.proteinas = proteinas;
        this.carbohidratos = carbohidratos;
        this.grasas = grasas;
        this.grupo_alimentario = grupo_alimentario;
        this.categoria = categoria;
    }

    public Alimento(String nombre)
    {
        this.nombre = nombre;
    }


    public PrioridadComida getPrioridad(){
        return prioridad;
    }

    public void setPrioridad(PrioridadComida prioridad){
        this.prioridad = prioridad;
    }

    public String getNombre() {
        return nombre;
    }
/*
    public Long getIdAl() {
        return id;
    }*/

    public String getGrupo() {
        return grupo_alimentario.toString();
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
        return url_imagen;
    }

    //Micronutrientes como vitaminas, sales minerales
    //FALTA POR IMPLEMENTAR EL RESTO DE ELEMENTOS



}
