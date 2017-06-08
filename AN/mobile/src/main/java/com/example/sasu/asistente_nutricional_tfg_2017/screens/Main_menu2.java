package com.example.sasu.asistente_nutricional_tfg_2017.screens;

import android.graphics.Color;
import android.graphics.PointF;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.LinearLayout;


import com.example.sasu.asistente_nutricional_tfg_2017.Fragments.Inicio;
import com.example.sasu.asistente_nutricional_tfg_2017.Fragments.LoginFragment;
import com.example.sasu.asistente_nutricional_tfg_2017.R;
import com.hookedonplay.decoviewlib.DecoView;
import com.hookedonplay.decoviewlib.charts.EdgeDetail;
import com.hookedonplay.decoviewlib.charts.SeriesItem;
import com.hookedonplay.decoviewlib.charts.SeriesLabel;
import com.hookedonplay.decoviewlib.events.DecoEvent;

public class Main_menu2 extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener, Inicio.OnFragmentInteractionListener {

    FloatingActionButton fb1,fb2,fb3,fb4,fb5,fb6,fb7;
    LinearLayout fb2L,fb3L,fb4L,fb5L,fb6L,fb7L;
    Animation fabOpen, fabClose, fabClockw, fabAntiClockw;
    boolean isOpen = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_menu2);

        Inicio inicioFragment = new Inicio();
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.setCustomAnimations(R.anim.slide_in_left,R.anim.slide_out_left, R.anim.slide_in_left, R.anim.slide_out_left );
        transaction.add(R.id.fragment_container,inicioFragment);

        transaction.commit();
        //Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        //setSupportActionBar(toolbar);

        fb1 = (FloatingActionButton) findViewById(R.id.action_button);
        fb2 = (FloatingActionButton) findViewById(R.id.action_button2);
        fb3 = (FloatingActionButton) findViewById(R.id.action_button3);
        fb4 = (FloatingActionButton) findViewById(R.id.action_button4);
        fb5 = (FloatingActionButton) findViewById(R.id.action_button5);
        fb6 = (FloatingActionButton) findViewById(R.id.action_button6);
        fb7 = (FloatingActionButton) findViewById(R.id.action_button7);

        fb2L = (LinearLayout) findViewById(R.id.fab2Lay);
        fb3L = (LinearLayout) findViewById(R.id.fab3Lay);
        fb4L = (LinearLayout) findViewById(R.id.fab4Lay);
        fb5L = (LinearLayout) findViewById(R.id.fab5Lay);
        fb6L = (LinearLayout) findViewById(R.id.fab6Lay);
        fb7L = (LinearLayout) findViewById(R.id.fab7Lay);


        fabOpen = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.fab_open);
        fabClose = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.fab_close);
        fabClockw = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.rotate_clocl_wise);
        fabAntiClockw = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.rotate_anti_clocl_wise);

        fb1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                /*Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();*/
                if(isOpen){
                    fb2L.startAnimation(fabClose);
                    fb3L.startAnimation(fabClose);
                    fb4L.startAnimation(fabClose);
                    fb5L.startAnimation(fabClose);
                    fb6L.startAnimation(fabClose);
                    fb7L.startAnimation(fabClose);

                    fb2.startAnimation(fabClose);
                    fb3.startAnimation(fabClose);
                    fb4.startAnimation(fabClose);
                    fb5.startAnimation(fabClose);
                    fb6.startAnimation(fabClose);
                    fb7.startAnimation(fabClose);

                    fb1.startAnimation(fabAntiClockw);

                    fb2L.setVisibility(View.INVISIBLE);
                    fb3L.setVisibility(View.INVISIBLE);
                    fb4L.setVisibility(View.INVISIBLE);
                    fb5L.setVisibility(View.INVISIBLE);
                    fb6L.setVisibility(View.INVISIBLE);
                    fb7L.setVisibility(View.INVISIBLE);

                    fb2L.setClickable(false);
                    fb3L.setClickable(false);
                    fb4L.setClickable(false);
                    fb5L.setClickable(false);
                    fb6L.setClickable(false);
                    fb7L.setClickable(false);

                    fb2.setClickable(false);
                    fb3.setClickable(false);
                    fb4.setClickable(false);
                    fb5.setClickable(false);
                    fb6.setClickable(false);
                    fb7.setClickable(false);

                    isOpen = false;

                }else{
                    fb2L.startAnimation(fabOpen);
                    fb3L.startAnimation(fabOpen);
                    fb4L.startAnimation(fabOpen);
                    fb5L.startAnimation(fabOpen);
                    fb6L.startAnimation(fabOpen);
                    fb7L.startAnimation(fabOpen);

                    fb2.startAnimation(fabOpen);
                    fb3.startAnimation(fabOpen);
                    fb4.startAnimation(fabOpen);
                    fb5.startAnimation(fabOpen);
                    fb6.startAnimation(fabOpen);
                    fb7.startAnimation(fabOpen);

                    fb1.startAnimation(fabClockw);

                    fb2L.setVisibility(View.VISIBLE);
                    fb3L.setVisibility(View.VISIBLE);
                    fb4L.setVisibility(View.VISIBLE);
                    fb5L.setVisibility(View.VISIBLE);
                    fb6L.setVisibility(View.VISIBLE);
                    fb7L.setVisibility(View.VISIBLE);

                    fb2L.setClickable(true);
                    fb3L.setClickable(true);
                    fb4L.setClickable(true);
                    fb5L.setClickable(true);
                    fb6L.setClickable(true);
                    fb7L.setClickable(true);

                    fb2.setClickable(true);
                    fb3.setClickable(true);
                    fb4.setClickable(true);
                    fb5.setClickable(true);
                    fb6.setClickable(true);
                    fb7.setClickable(true);

                    isOpen = true;

                }
            }
        });

        fb2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                /*Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();*/
            }
        });

        /*DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();*/

        /*NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);*/

        //toolbar.setTitle("Inicio");

        /*
        DecoView arcView = (DecoView)findViewById(R.id.dynamicArcView);


// Create background track
        arcView.addSeries(new SeriesItem.Builder(Color.argb(255, 218, 218, 218))
                .setRange(0, 100, 100)
                .setInitialVisibility(false)
                .setLineWidth(32f)
                .build());

//Create data series track
        final SeriesItem seriesItem1 = new SeriesItem.Builder(Color.argb(255, 64, 196, 0))
                .setRange(0, 100, 0)
                .setLineWidth(32f)
                .addEdgeDetail(new EdgeDetail(EdgeDetail.EdgeType.EDGE_OUTER, Color.parseColor("#22000000"), 0.4f))
                .setSeriesLabel(new SeriesLabel.Builder("Percent %.0f%%")
                        .setColorBack(Color.argb(218, 0, 0, 0))
                        .setColorText(Color.argb(255, 255, 255, 255))
                        .build())
                .build();
        SeriesItem seriesItem2 = new SeriesItem.Builder(Color.argb(255, 255, 196, 0))
                .setRange(0, 20, 0)
                .setInset(new PointF(20f, 20f))
                .setLineWidth(10f)
                .build();

        final String format = "%.0f%%";

        seriesItem1.addArcSeriesItemListener(new SeriesItem.SeriesItemListener() {
            @Override
            public void onSeriesItemAnimationProgress(float percentComplete, float currentPosition) {
                if (format.contains("%%")) {
                    float percentFilled = ((currentPosition - seriesItem1.getMinValue()) / (seriesItem1.getMaxValue() - seriesItem1.getMinValue()));
                    view.setText(String.format(format, percentFilled * 100f));
                } else {
                    view.setText(String.format(format, currentPosition));
                }
            }

            @Override
            public void onSeriesItemDisplayProgress(float percentComplete) {

            }
        });

        int series1Index = arcView.addSeries(seriesItem1);
        int series2Index = arcView.addSeries(seriesItem2);

        arcView.addEvent(new DecoEvent.Builder(DecoEvent.EventType.EVENT_SHOW, true)
                .setDelay(1000)
                .setDuration(2000)
                .build());

        arcView.addEvent(new DecoEvent.Builder(25).setIndex(series1Index).setDelay(4000).build());
        arcView.addEvent(new DecoEvent.Builder(100).setIndex(series1Index).setDelay(8000).build());
        arcView.addEvent(new DecoEvent.Builder(10).setIndex(series1Index).setDelay(12000).build());

        arcView.addEvent(new DecoEvent.Builder(DecoEvent.EventType.EVENT_SHOW, true)
                .setDelay(1000)
                .setDuration(2000)
                .build());

        arcView.addEvent(new DecoEvent.Builder(25).setIndex(series2Index).setDelay(4000).build());
        arcView.addEvent(new DecoEvent.Builder(70).setIndex(series2Index).setDelay(5000).build());
        arcView.addEvent(new DecoEvent.Builder(100).setIndex(series2Index).setDelay(18000).build());

        */


    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main_menu2, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        /*if (id == R.id.action_settings) {
            return true;
        }*/

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            // Handle the camera action
        } else if (id == R.id.nav_gallery) {

        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}
