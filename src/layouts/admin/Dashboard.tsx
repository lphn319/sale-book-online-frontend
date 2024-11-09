import React from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../utils/style/Dashboard.css";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const cards = [
        {
            title: "Quản lý người dùng",
            description: "Xem và quản lý người dùng trong hệ thống.",
            buttonText: "Xem người dùng",
            route: "/quan-li-nguoi-dung",
        },
        {
            title: "Quản lý sách",
            description: "Xem và quản lý danh sách sách.",
            buttonText: "Xem sách",
            route: "/quan-li-sach",
        },
        {
            title: "Quản lý đơn hàng",
            description: "Xem và quản lý đơn hàng.",
            buttonText: "Xem đơn hàng",
            route: "/quan-li-don-hang",
        },
        {
            title: "Quản lý thể loại",
            description: "Xem và quản lý các thể loại sách.",
            buttonText: "Xem thể loại",
            route: "/quan-li-the-loai",
        },
    ];

    return (
        <Box className="dashboard-container">
            <Typography variant="h4" gutterBottom className="dashboard-title">
                Dashboard Quản Trị
            </Typography>
            <Grid container spacing={4}>
                {cards.map((card, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Card className="dashboard-card">
                            <CardContent>
                                <Typography variant="h5" component="div" className="dashboard-card-title">
                                    {card.title}
                                </Typography>
                                <Typography className="dashboard-card-description">
                                    {card.description}
                                </Typography>
                            </CardContent>
                            <Box className="dashboard-card-button-container">
                                <Button variant="contained" fullWidth onClick={() => navigate(card.route)}>
                                    {card.buttonText}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
