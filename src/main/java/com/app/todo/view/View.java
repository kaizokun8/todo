package com.app.todo.view;

public interface View {

    interface Id {
    }

    interface Title {
    }

    interface Description {
    }

    interface Priority {
    }

    interface Scheduled {
    }

    interface SaveTime {
    }

    interface Time {
    }

    interface Done {
    }

    interface getTodo extends Id, Title, Scheduled, Description, Priority, SaveTime, Time, Done {
    }

    interface getTodos extends Id, Title, Scheduled, Priority, SaveTime, Time, Done {
    }
}
