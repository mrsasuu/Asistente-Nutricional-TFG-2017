package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.google.gson.annotations.SerializedName;

public class News {
    @SerializedName("news")
    private int news;
    private String error;

    public News() {
    }

    public News(int news, String error) {
        this.news = news;
        this.error = error;
    }

    public int getNews() {
        return news;
    }

    public void setNews(int news) {
        this.news = news;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
