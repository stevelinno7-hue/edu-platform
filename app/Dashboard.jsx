import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const [bySubject, setBySubject] = useState([]);
  const [byGrade, setByGrade] = useState([]);
  const [byLevel, setByLevel] = useState([]);
  const [growth, setGrowth] = useState([]);

  useEffect(() => {
    async function load() {
      setBySubject(await api("/stats/questions-by-subject"));
      setByGrade(await api("/stats/questions-by-grade"));
      setByLevel(await api("/stats/questions-by-level"));
      setGrowth(await api("/stats/questions-growth"));
    }
    load();
  }, []);

  const pieData = (items) => ({
    labels: items.map(i => i._id),
    datasets: [
      {
        data: items.map(i => i.count),
        backgroundColor: [
          "#4e79a7",
          "#f28e2b",
          "#e15759",
          "#76b7b2",
          "#59a14f",
          "#edc948"
        ]
      }
    ]
  });

  const growthData = {
    labels: growth.map(i => i._id),
    datasets: [
      {
        label: "每月新增題目數",
        data: growth.map(i => i.count),
        borderColor: "#4e79a7",
        backgroundColor: "rgba(78,121,167,0.3)"
      }
    ]
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>老師後台儀表板</h2>

      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        <div style={{ width: 300 }}>
          <h3>各科目題目數</h3>
          <Pie data={pieData(bySubject)} />
        </div>

        <div style={{ width: 300 }}>
          <h3>各年級題目數</h3>
          <Pie data={pieData(byGrade)} />
        </div>

        <div style={{ width: 300 }}>
          <h3>各難度題目數</h3>
          <Pie data={pieData(byLevel)} />
        </div>
      </div>

      <div style={{ marginTop: 40, width: 700 }}>
        <h3>題庫成長（每月新增題目數）</h3>
        <Line data={growthData} />
      </div>
    </div>
  );
}
