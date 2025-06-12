import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./style";
import Storage, { Task } from "../../server/taskService";
import { useFocusEffect } from "@react-navigation/native";
import { themas } from "../../global/themes";

const Analytics = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "year">(
    "week"
  );
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [activityData, setActivityData] = useState({
    weeklyActivity: Array(7).fill(0),
    monthlyActivity: Array(6).fill(0),
    yearlyActivity: Array(12).fill(0),
  });

  // Instanciar o serviço de storage
  const storage = new Storage();

  // Buscar tarefas ao montar o componente ou quando a tela receber foco
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  // Processar dados sempre que as tarefas ou filtro de tempo mudar
  React.useEffect(() => {
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

  // Processar dados das tarefas
  const processTaskData = () => {
    if (!tasks.length) return;

    // Contagem básica de tarefas
    const completed = tasks.filter((task) => task.completed === true).length;
    const pending = tasks.length - completed;

    setTotalTasks(tasks.length);
    setCompletedTasks(completed);
    setPendingTasks(pending);

    // Inicializar arrays para atividade
    const weeklyActivity = Array(7).fill(0);
    const monthlyActivity = Array(6).fill(0);
    const yearlyActivity = Array(12).fill(0);

    // Preencher dados de acordo com o filtro de tempo
    tasks.forEach((task) => {
      const taskDate = new Date(task.dateCreated);
      const now = new Date();

      // Atividade semanal (por dia da semana)
      const dayOfWeek = taskDate.getDay();
      weeklyActivity[dayOfWeek]++;

      // Atividade mensal (últimos 6 períodos de 5 dias)
      const dayOfMonth = taskDate.getDate(); // 1 a 31

      // Determinando o grupo (1-5, 6-10, etc)
      let groupIndex;
      if (dayOfMonth <= 5) groupIndex = 0;
      else if (dayOfMonth <= 10) groupIndex = 1;
      else if (dayOfMonth <= 15) groupIndex = 2;
      else if (dayOfMonth <= 20) groupIndex = 3;
      else if (dayOfMonth <= 25) groupIndex = 4;
      else groupIndex = 5; // 26-30/31

      monthlyActivity[groupIndex]++;

      // Atividade anual (por mês)
      const currentYear = now.getFullYear();
      const taskYear = taskDate.getFullYear();

      if (taskYear === currentYear) {
        // Usar o mês diretamente para indexar (0 = Jan, 11 = Dez)
        const month = taskDate.getMonth();
        yearlyActivity[month]++;
      }
    });

    setActivityData({ weeklyActivity, monthlyActivity, yearlyActivity });
  };

  // Calcular a taxa de conclusão (porcentagem)
  const getCompletionRate = () => {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  // Obter média de tarefas concluídas por dia na última semana
  const getDailyAverage = () => {
    if (!tasks.length) return "0.0";

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const completedLastWeek = tasks.filter(
      (task) => task.completed && new Date(task.dateCreated) >= lastWeek
    ).length;

    return (completedLastWeek / 7).toFixed(1);
  };

  // Determinar cor com base na intensidade
  const getIntensityColor = (value, maxValue) => {
    if (value === 0) return themas.colors.white;
    const intensity = maxValue > 0 ? value / maxValue : 0;
    if (intensity < 0.25) return "rgba(76, 175, 80, 0.2)";
    if (intensity < 0.5) return "rgba(76, 175, 80, 0.5)";
    if (intensity < 0.75) return "rgba(76, 175, 80, 0.7)";
    return "rgba(76, 175, 80, 1.0)";
  };

  // Renderizar células de atividade
  const renderActivityCells = () => {
    const currentActivityData =
      timeFilter === "week"
        ? activityData.weeklyActivity
        : timeFilter === "month"
        ? activityData.monthlyActivity
        : activityData.yearlyActivity;

    const labels =
      timeFilter === "week"
        ? ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
        : timeFilter === "month"
        ? ["1-5", "6-10", "11-15", "16-20", "21-25", "26-31"]
        : [
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

    const maxValue = Math.max(...currentActivityData);

    return (
      <View style={styles.activityContainer}>
        {currentActivityData.map((value, index) => (
          <View
            key={index}
            style={[
              styles.activityItem,
              {
                width:
                  timeFilter === "year"
                    ? "8.3%"
                    : timeFilter === "month"
                    ? "16.6%"
                    : "14.2%",
              },
            ]}
          >
            <View
              style={[
                styles.activityCell,
                { backgroundColor: getIntensityColor(value, maxValue) },
              ]}
            >
              <Text style={styles.activityValue}>{value}</Text>
            </View>
            <Text style={styles.activityLabel}>{labels[index]}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Renderizar barra de progresso
  const renderProgressBar = () => {
    const percentage = getCompletionRate();
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        </View>
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabel}>Completadas</Text>
          <Text style={styles.progressValue}>{percentage}%</Text>
          <Text style={styles.progressLabel}>Pendentes</Text>
        </View>
      </View>
    );
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
          <Text
            style={[
              styles.timeFilterText,
              timeFilter === "week" && styles.activeFilterText,
            ]}
          >
            Semana
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeFilterButton,
            timeFilter === "month" && styles.activeTimeFilter,
          ]}
          onPress={() => setTimeFilter("month")}
        >
          <Text
            style={[
              styles.timeFilterText,
              timeFilter === "month" && styles.activeFilterText,
            ]}
          >
            Mês
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeFilterButton,
            timeFilter === "year" && styles.activeTimeFilter,
          ]}
          onPress={() => setTimeFilter("year")}
        >
          <Text
            style={[
              styles.timeFilterText,
              timeFilter === "year" && styles.activeFilterText,
            ]}
          >
            Ano
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cards de estatísticas */}
      <View style={styles.statsCardContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.statsValue}>{totalTasks}</Text>
          <Text style={styles.statsLabel}>Total</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={[styles.statsValue, { color: themas.colors.green }]}>
            {completedTasks}
          </Text>
          <Text style={styles.statsLabel}>Concluídas</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={[styles.statsValue, { color: themas.colors.red }]}>
            {pendingTasks}
          </Text>
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

      {/* Visualização de status das tarefas */}
      {tasks.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Status das Tarefas</Text>
          {renderProgressBar()}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: themas.colors.green },
                ]}
              />
              <Text>Concluídas: {completedTasks}</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: themas.colors.red },
                ]}
              />
              <Text>Pendentes: {pendingTasks}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Visualização de atividade */}
      {tasks.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>
            {timeFilter === "week"
              ? "Atividade por Dia da Semana"
              : timeFilter === "month"
              ? "Atividade nos Últimos 30 Dias"
              : "Atividade por Mês"}
          </Text>
          {renderActivityCells()}
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
