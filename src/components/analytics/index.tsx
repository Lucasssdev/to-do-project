import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import { styles } from "./style";
import Storage, { Task } from "../../server/taskService";

const windowWidth = Dimensions.get("window").width;

const Analytics = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "year">(
    "week"
  );
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [chartData, setChartData] = useState({
    pieData: [],
    barData: { labels: [], datasets: [{ data: [] }] },
    lineData: { labels: [], datasets: [{ data: [] }] },
  });

  // Instanciar o serviço de storage
  const storage = new Storage();

  // Buscar tarefas ao montar o componente
  useEffect(() => {
    loadTasks();
  }, []);

  // Processar dados sempre que as tarefas ou filtro de tempo mudar
  useEffect(() => {
    processTaskData();
  }, [tasks, timeFilter]);

  // Carregar tarefas do storage
  const loadTasks = async () => {
    try {
      const allTasks = await storage.getTasks();
      setTasks(allTasks);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  // Processar dados das tarefas para os gráficos
  const processTaskData = () => {
    if (!tasks.length) return;

    // Calcular estatísticas básicas
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.length - completed;

    setTotalTasks(tasks.length);
    setCompletedTasks(completed);
    setPendingTasks(pending);

    // Dados para o gráfico de pizza
    const pieData = [
      {
        name: "Concluídas",
        population: completed,
        color: "green",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Pendentes",
        population: pending,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];

    // Preparar dados para gráficos temporais
    let labels = [];
    let completedData = [];
    let createdData = [];

    // Definir período de tempo com base no filtro
    const now = new Date();
    let startDate: Date;

    switch (timeFilter) {
      case "week":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        break;
      case "month":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30);
        // Criar labels para últimos 30 dias em grupos de 5 dias
        for (let i = 0; i < 6; i++) {
          const date = new Date(now);
          date.setDate(now.getDate() - 5 * i);
          labels.unshift(date.getDate() + "/" + (date.getMonth() + 1));
        }
        break;
      case "year":
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 12);
        // Labels para os últimos 12 meses
        const monthNames = [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ];
        for (let i = 0; i < 12; i++) {
          const monthIndex = (now.getMonth() - i + 12) % 12;
          labels.unshift(monthNames[monthIndex]);
        }
        break;
    }

    // Inicializar arrays de dados com zeros
    const dataLength = labels.length;
    for (let i = 0; i < dataLength; i++) {
      completedData[i] = 0;
      createdData[i] = 0;
    }

    // Preencher dados de acordo com o filtro de tempo
    tasks.forEach((task) => {
      const taskDate = new Date(task.dateCreated);

      if (timeFilter === "week") {
        // Agrupar por dia da semana
        const dayIndex = taskDate.getDay(); // 0 = Domingo, 6 = Sábado
        createdData[dayIndex]++;

        if (task.completed && task.dateFinish) {
          const completeDate = new Date(task.dateFinish);
          const completeDayIndex = completeDate.getDay();
          completedData[completeDayIndex]++;
        }
      } else if (timeFilter === "month") {
        // Agrupar por períodos de 5 dias nos últimos 30 dias
        const daysAgo = Math.floor(
          (now.getTime() - taskDate.getTime()) / (1000 * 3600 * 24)
        );
        if (daysAgo <= 30) {
          const groupIndex = Math.min(Math.floor(daysAgo / 5), 5);
          createdData[5 - groupIndex]++;

          if (task.completed && task.dateFinish) {
            const completeDate = new Date(task.dateFinish);
            const completeDaysAgo = Math.floor(
              (now.getTime() - completeDate.getTime()) / (1000 * 3600 * 24)
            );
            if (completeDaysAgo <= 30) {
              const completeGroupIndex = Math.min(
                Math.floor(completeDaysAgo / 5),
                5
              );
              completedData[5 - completeGroupIndex]++;
            }
          }
        }
      } else if (timeFilter === "year") {
        // Agrupar por mês nos últimos 12 meses
        if (taskDate >= startDate) {
          const monthsAgo = (now.getMonth() - taskDate.getMonth() + 12) % 12;
          createdData[11 - monthsAgo]++;

          if (task.completed && task.dateFinish) {
            const completeDate = new Date(task.dateFinish);
            if (completeDate >= startDate) {
              const completeMonthsAgo =
                (now.getMonth() - completeDate.getMonth() + 12) % 12;
              completedData[11 - completeMonthsAgo]++;
            }
          }
        }
      }
    });

    // Configurar dados para os gráficos
    const barData = {
      labels,
      datasets: [
        {
          data: createdData,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ["Tarefas Criadas"],
    };

    const lineData = {
      labels,
      datasets: [
        {
          data: completedData,
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ["Tarefas Concluídas"],
    };

    setChartData({ pieData, barData, lineData });
  };

  // Calcular a taxa de conclusão (porcentagem)
  const getCompletionRate = () => {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  // Obter média de tarefas concluídas por dia na última semana
  const getDailyAverage = () => {
    if (!tasks.length) return 0;

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const completedLastWeek = tasks.filter(
      (task) =>
        task.completed &&
        task.dateFinish &&
        new Date(task.dateFinish) >= lastWeek
    ).length;

    return (completedLastWeek / 7).toFixed(1);
  };

  // Configuração comum para os gráficos
  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Análise de Tarefas</Text>

      {/* Botões de filtro de tempo */}
      <View style={styles.timeFilterContainer}>
        <TouchableOpacity
          style={[
            styles.timeFilterButton,
            timeFilter === "week" && styles.activeTimeFilter,
          ]}
          onPress={() => setTimeFilter("week")}
        >
          <Text style={styles.timeFilterText}>Semana</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeFilterButton,
            timeFilter === "month" && styles.activeTimeFilter,
          ]}
          onPress={() => setTimeFilter("month")}
        >
          <Text style={styles.timeFilterText}>Mês</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeFilterButton,
            timeFilter === "year" && styles.activeTimeFilter,
          ]}
          onPress={() => setTimeFilter("year")}
        >
          <Text style={styles.timeFilterText}>Ano</Text>
        </TouchableOpacity>
      </View>

      {/* Cards de estatísticas */}
      <View style={styles.statsCardContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.statsValue}>{totalTasks}</Text>
          <Text style={styles.statsLabel}>Total</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsValue}>{completedTasks}</Text>
          <Text style={styles.statsLabel}>Concluídas</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsValue}>{pendingTasks}</Text>
          <Text style={styles.statsLabel}>Pendentes</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsValue}>{getCompletionRate()}%</Text>
          <Text style={styles.statsLabel}>Taxa</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsValue}>{getDailyAverage()}</Text>
          <Text style={styles.statsLabel}>Média/dia</Text>
        </View>
      </View>

      {/* Gráfico de pizza - Status das tarefas */}
      {tasks.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Status das Tarefas</Text>
          <PieChart
            data={chartData.pieData}
            width={windowWidth - 40}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      )}

      {/* Gráfico de barras - Tarefas criadas por período */}
      {tasks.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Tarefas Criadas</Text>
          <BarChart
            data={chartData.barData}
            width={windowWidth - 40}
            height={220}
            yAxisLabel=""
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            }}
            verticalLabelRotation={30}
          />
        </View>
      )}

      {/* Gráfico de linha - Tarefas concluídas por período */}
      {tasks.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Tarefas Concluídas</Text>
          <LineChart
            data={chartData.lineData}
            width={windowWidth - 40}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
            }}
            bezier
            verticalLabelRotation={30}
          />
        </View>
      )}

      {/* Mensagem quando não há tarefas */}
      {tasks.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Nenhuma tarefa encontrada. Adicione tarefas para visualizar
            estatísticas.
          </Text>
        </View>
      )}

      <View style={styles.footer} />
    </ScrollView>
  );
};

export default Analytics;
