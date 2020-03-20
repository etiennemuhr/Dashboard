import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import StatsCard from "../components/StatsCard";
import { Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [earnedMoney, setEarnedMoney] = useState(0);

  useEffect(() => {
    const getReceiptData = async () => {
      const res = await axios.get("https://www.dashboardapi.etiennemuhr.at/api/v1/receipts");
      let earnedMoney = 0;
      res.data.data.map(data => {
        earnedMoney = earnedMoney + parseFloat(data.brutto);
        return null;
      });
      setEarnedMoney(earnedMoney);
    };
    getReceiptData();
    const getCustomerData = async () => {
      const res = await axios.get("https://www.dashboardapi.etiennemuhr.at/api/v1/customers");
      setCustomerCount(res.data.data.length);
    };
    getCustomerData();
  }, []);

  const data = canvas => {
    const ctx = canvas.getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(0, 255,0, 0.4)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");
    return {
      labels: [
        "Jänner",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
      ],
      datasets: [
        {
          label: "Umsatz in Euro pro Monat",
          backgroundColor: gradient,
          data: [
            earnedMoney,
            2500,
            3000,
            6000,
            8000,
            10000,
            3250,
            4325,
            6000,
            10500,
            8035,
            12500
          ],
          fill: true,
          pointBackgroundColor: "white",
          borderWidth: 1,
          borderColor: "green"
        }
      ]
    };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap"
        }}
      >
        <Link to="/receipts" style={{ textDecoration: "none" }}>
          <StatsCard
            title="Umsatz"
            subtitle={`${earnedMoney.toFixed(2)}€`}
            footerText="Aktueller Monat"
            mainIcon="attach_money"
            secondIcon="calendar_today"
            color1="#1dc71d"
            color2="#6bcf30"
            rgbaWith0_4Opacity="rgba(21, 255, 0, 0.4)"
          ></StatsCard>
        </Link>
        <Link to="/receipts" style={{ textDecoration: "none" }}>
          <StatsCard
            title="Umsatz"
            subtitle={`${earnedMoney.toFixed(2)}€`}
            footerText="Komplettes Jahr"
            mainIcon="payment"
            secondIcon="calendar_today"
            color1="#00D1C5"
            color2="#00CDC1"
            rgbaWith0_4Opacity="rgba(0, 205, 193, 0.4)"
          ></StatsCard>
        </Link>
        <Link to="/customers" style={{ textDecoration: "none" }}>
          <StatsCard
            title="Aktuelle Kunden"
            subtitle={customerCount}
            footerText="Aktuell"
            mainIcon="person"
            secondIcon="calendar_today"
            color1="#E50000"
            color2="#8B0202"
            rgbaWith0_4Opacity="rgba(229, 0, 0, 0.4)"
          ></StatsCard>
        </Link>
        <Link to="/customers" style={{ textDecoration: "none" }}>
          <StatsCard
            title="Neue Kunden diesen Monat"
            subtitle={customerCount}
            footerText="Aktuell"
            mainIcon="add"
            secondIcon="calendar_today"
            color1="#8600BC"
            color2="#C050EE"
            rgbaWith0_4Opacity="rgba(192, 80, 238, 0.4)"
          ></StatsCard>
        </Link>
      </div>
      <Paper
        style={{
          alignSelf: "center",
          width: "70%",
          marginTop: "5rem",
          padding: "25px"
        }}
      >
        <Typography
          component="p"
          variant="h5"
          style={{ marginBottom: "2rem", textAlign: "center" }}
        >
          Umsatz pro Monat
        </Typography>
        <Line
          data={data}
          options={{
            scales: {
              yAxes: [
                {
                  gridLines: {
                    color: "rgba(200, 200, 200, 0.2)",
                    lineWidth: 1,
                    zeroLineWidth: 0
                  },
                  ticks: {
                    callback: function(label, index, labels) {
                      if (!label) {
                        return `${label}€`;
                        // } else if (label > 14999) {
                        //   return "Advanced: " + label;
                        // } else if (label > 4999) {
                        //   return "Umsatz weniger als: " + label;
                      } else {
                        return `${label}€`;
                      }
                      //                         return '$' + label;
                    }
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    color: "rgba(200, 200, 200, 0.2)",
                    lineWidth: 1,
                    zeroLineWidth: 0
                  }
                }
              ]
            },
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              easing: "easeInOutQuad",
              duration: 520
            },
            legend: {
              display: false
            },
            tooltips: {
              backgroundColor: "rgba(0,0,0,0.3)",
              titleFontColor: "lightgreen",
              caretSize: 28,
              cornerRadius: 5,
              xPadding: 15,
              yPadding: 15
            }
          }}
          height={300}
        />
      </Paper>
    </div>
  );
};

export default Home;
