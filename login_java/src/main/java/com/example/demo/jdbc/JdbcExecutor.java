package com.example.demo.jdbc;

import lombok.Getter;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.support.JdbcUtils;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class JdbcExecutor implements AutoCloseable {

    private final DataSource dataSource;

    @Getter
    private Connection connection;

    @Getter
    private Statement statement;

    @Getter
    private ResultSet resultSet;

    private JdbcExecutor(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void close() throws Exception {
        JdbcUtils.closeResultSet(resultSet);
        JdbcUtils.closeStatement(statement);
        DataSourceUtils.releaseConnection(connection, dataSource);
    }

    public static JdbcExecutor executeSql(DataSource dataSource, String sql) throws SQLException {
        JdbcExecutor jdbcWrapper = new JdbcExecutor(dataSource);
        jdbcWrapper.connection = DataSourceUtils.getConnection(dataSource);
        jdbcWrapper.statement = jdbcWrapper.connection.createStatement();
        jdbcWrapper.resultSet = jdbcWrapper.statement.executeQuery(sql);
        return jdbcWrapper;
    }
}
