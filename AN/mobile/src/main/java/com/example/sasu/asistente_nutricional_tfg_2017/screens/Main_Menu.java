package com.example.sasu.asistente_nutricional_tfg_2017.screens;

import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;

import com.example.sasu.asistente_nutricional_tfg_2017.R;

public class Main_Menu extends AppCompatActivity{

   private String[] mPlanetTitles = {"MEnu1","Menu2"};
    private DrawerLayout mDrawerLayout;
    private ListView mDrawerList;
    private ActionBar actionBar;
    private ActionBarDrawerToggle mToggle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_menu);


        mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        mToggle = new ActionBarDrawerToggle(this, mDrawerLayout,R.string.open,R.string.close);

        mDrawerLayout.addDrawerListener(mToggle);
        mToggle.syncState();

        Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        //setSupportActionBar(myToolbar);
        actionBar = getSupportActionBar();
        actionBar.setDisplayHomeAsUpEnabled(true);
        myToolbar.setTitle("Inicio");
        //myToolbar.


        /*//mPlanetTitles = getResources().getStringArray(R.array.planets_array);
        mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        mDrawerList = (ListView) findViewById(R.id.left_drawer);

        // Set the adapter for the list view
        mDrawerList.setAdapter(new ArrayAdapter<String>(this,
                R.layout.drawer_list_item, mPlanetTitles));*/
        // Set the list's click listener
       //mDrawerList.setOnItemClickListener(new DrawerItemClickListener());


/*
        input_user_layout = (LinearLayout) findViewById(R.id.input_user_layout);
        input_user = (EditText) findViewById(R.id.input_user);

        input_user.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if(hasFocus){
                    input_user_layout.setBackgroundResource(R.drawable.borderr);
                }else {
                    input_user_layout.setBackgroundResource(R.drawable.no_border);
                }
            }
        });

        input_password_layout = (LinearLayout) findViewById(R.id.input_password_layout);
        input_password = (EditText) findViewById(R.id.input_password);

        input_password.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if(hasFocus){
                    input_password_layout.setBackgroundResource(R.drawable.borderr);
                }else {
                    input_password_layout.setBackgroundResource(R.drawable.no_border);
                }
            }
        });*/
/*
        LoginFragment loginFragment = new LoginFragment();
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        //transaction.setCustomAnimations(R.anim.slide_in_left,R.anim.slide_out_left);
        transaction.setCustomAnimations(R.anim.slide_in_left,R.anim.slide_out_left, R.anim.slide_in_left, R.anim.slide_out_left );
        transaction.add(R.id.activity_Main_Login,loginFragment);
        //transaction.addToBackStack(transaction.toString());
        transaction.commit();
*/

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if(mToggle.onOptionsItemSelected(item)){
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed() {
        FragmentManager fragmentManager = getSupportFragmentManager();
        //Toast.makeText(this,Integer.toString(fragmentManager.getBackStackEntryCount()),Toast.LENGTH_LONG).show();
        if(fragmentManager.getBackStackEntryCount()<1)
        {
            new AlertDialog.Builder(this).setMessage(R.string.exit_Message)
                    .setCancelable(false)
                    .setPositiveButton(R.string.Yes, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            finish();
                            System.exit(0);

                        }
                    })
                    .setNegativeButton(R.string.No, null)
                    .show();
        }else{
            super.onBackPressed();
        }


    }

    /*@Override
    public void onFragmentInteraction(Uri uri) {

    }*/
}
