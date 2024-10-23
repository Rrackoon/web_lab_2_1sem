package ru.itmo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ResultBean implements Serializable {
    private List<AreaResult> results;

    public ResultBean() {
        results = new ArrayList<>();
    }

    public void addResult(AreaResult result) {
        results.add(result);
    }

    public List<AreaResult> getResults() {
        return results;
    }
}
