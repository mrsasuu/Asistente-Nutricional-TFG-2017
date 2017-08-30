package com.example.sasu.asistente_nutricional_tfg_2017.utilidades;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import java.util.Calendar;

/**
 * Created by Sasu on 27/08/2017.
 */

public class BootService extends BroadcastReceiver{

    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getAction().equals(Intent.ACTION_BOOT_COMPLETED)){

            Context ctx = context;
/** this gives us the time for the first trigger.  */
            Calendar cal = Calendar.getInstance();
            AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
            long interval = 1000 * 60 * 45; // 5 minutes in milliseconds

            //long interval = 1000 * 60 * 60 * 3; // intervalo de 3 horas
            Intent serviceIntent = new Intent(ctx, UpdateController.class);
            PendingIntent servicePendingIntent =
                    PendingIntent.getService(ctx,
                            UpdateController.SERVICE_ID, // integer constant used to identify the service
                            serviceIntent,
                            PendingIntent.FLAG_CANCEL_CURRENT);  // FLAG to avoid creating a second service if there's already one running
// there are other options like setInexactRepeating, check the docs
            am.setRepeating(
                    AlarmManager.RTC_WAKEUP,//type of alarm. This one will wake up the device when it goes off, but there are others, check the docs
                    cal.getTimeInMillis(),
                    interval,
                    servicePendingIntent
            );

            Calendar cal2 = Calendar.getInstance();
            AlarmManager am2 = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
            //long interval2 = 1000 * 2; // 5 minutes in milliseconds

            long interval2 = 1000 * 60 * 60 * 3; // intervalo de 3 horas
            Intent serviceIntent2 = new Intent(ctx, WaterService.class);
// make sure you **don't** use *PendingIntent.getBroadcast*, it wouldn't work
            PendingIntent servicePendingIntent2 =
                    PendingIntent.getService(ctx,
                            WaterService.SERVICE_ID, // integer constant used to identify the service
                            serviceIntent2,
                            PendingIntent.FLAG_CANCEL_CURRENT);  // FLAG to avoid creating a second service if there's already one running
// there are other options like setInexactRepeating, check the docs
            am2.setRepeating(
                    AlarmManager.RTC_WAKEUP,//type of alarm. This one will wake up the device when it goes off, but there are others, check the docs
                    cal2.getTimeInMillis(),
                    interval2,
                    servicePendingIntent2
            );


            Intent breakfast = new Intent(ctx , BreakfastService.class);
            AlarmManager alarmManager = (AlarmManager)ctx.getSystemService(Context.ALARM_SERVICE);
            PendingIntent pendingIntent = PendingIntent.getService(ctx, 0, breakfast, 0);
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.HOUR_OF_DAY, 10);
            calendar.set(Calendar.MINUTE, 00);
            calendar.set(Calendar.SECOND, 00);
            alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), AlarmManager.INTERVAL_DAY , pendingIntent);  //set repeating every 24 hours

            Intent lunch = new Intent(ctx , LunchService.class);
            AlarmManager alarmManager2 = (AlarmManager)ctx.getSystemService(Context.ALARM_SERVICE);
            PendingIntent pendingIntent2 = PendingIntent.getService(ctx, 0, lunch, 0);
            Calendar calendar2 = Calendar.getInstance();
            calendar2.set(Calendar.HOUR_OF_DAY, 14);
            calendar2.set(Calendar.MINUTE, 00);
            calendar2.set(Calendar.SECOND, 00);
            alarmManager2.setRepeating(AlarmManager.RTC_WAKEUP, calendar2.getTimeInMillis(), AlarmManager.INTERVAL_DAY , pendingIntent2);  //set repeating every 24 hours

            Intent snack = new Intent(ctx , SnackService.class);
            AlarmManager alarmManager3 = (AlarmManager)ctx.getSystemService(Context.ALARM_SERVICE);
            PendingIntent pendingIntent3 = PendingIntent.getService(ctx, 0, snack, 0);
            Calendar calendar3 = Calendar.getInstance();
            calendar3.set(Calendar.HOUR_OF_DAY, 15);
            calendar3.set(Calendar.MINUTE, 00);
            calendar3.set(Calendar.SECOND, 00);
            alarmManager3.setRepeating(AlarmManager.RTC_WAKEUP, calendar3.getTimeInMillis(), AlarmManager.INTERVAL_DAY , pendingIntent3);  //set repeating every 24 hours

            Intent dinner = new Intent(ctx , CenadoService.class);
            AlarmManager alarmManager4 = (AlarmManager)ctx.getSystemService(Context.ALARM_SERVICE);
            PendingIntent pendingIntent4 = PendingIntent.getService(ctx, 0, dinner, 0);
            Calendar calendar4 = Calendar.getInstance();
            calendar4.set(Calendar.HOUR_OF_DAY, 21);
            calendar4.set(Calendar.MINUTE, 30);
            calendar4.set(Calendar.SECOND, 00);
            alarmManager4.setRepeating(AlarmManager.RTC_WAKEUP, calendar4.getTimeInMillis(), AlarmManager.INTERVAL_DAY , pendingIntent4);  //set repeating every 24 hours


        }
    }
}
