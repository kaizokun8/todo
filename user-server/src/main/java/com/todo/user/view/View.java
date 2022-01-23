package com.todo.user.view;

public interface View {

    interface Id {
    }

    interface Username {
    }

    interface getTodo extends Id, Username {
    }

    interface getTodos extends Id, Username {
    }
}
