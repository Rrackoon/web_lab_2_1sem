package ru.itmo;

import java.io.Serializable;

public class AreaResult implements Serializable {
    private double x;
    private double y;
    private double r;
    private boolean isInside;
    private String currentTime;

    public AreaResult(double x, double y, double r, boolean isInside, String currentTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isInside = isInside;
        this.currentTime = currentTime;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isInside() {
        return isInside;
    }

    public String getCurrentTime() {
        return currentTime;
    }
}
