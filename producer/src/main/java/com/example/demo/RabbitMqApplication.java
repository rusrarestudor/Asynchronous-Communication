package com.example.demo;


import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

@SpringBootApplication
public class RabbitMqApplication {

    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {

        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");

        Utils utils = new Utils();
        utils.JSONsFromCSV("sensor.csv");

        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
             channel.queueDeclare(QUEUE_NAME, false, false, false, null);
             String message = "Hello World!";
             channel.basicPublish("", QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
             System.out.println(" [x] Sent '" + message + "'");
        }
    }
}