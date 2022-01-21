package com.todo.controller;

import java.util.Calendar;
import java.util.Date;

public class Test {

    public static void main(String[] args) {

        int year = 2022;
        int month = 11;

        Calendar cal = Calendar.getInstance();

        cal.set(year,month,1,0,0,0);

        Date firstDay =  cal.getTime();

        cal.set(year,month + 1,0,0,0,0);

        Date lastDay = cal.getTime();

        System.out.println(firstDay);

        System.out.println(firstDay.getTime());

        System.out.println(firstDay);

        System.out.println(lastDay);
    }
}
