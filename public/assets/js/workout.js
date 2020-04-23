async function initWorkout() {
    const lastWorkout = await API.getLastWorkout();
    //Initiating workout and displaying details of workout if any
    if (lastWorkout) {
      document
        .querySelector("a[href='/exercise?']")
        .setAttribute("href", `/exercise?id=${lastWorkout._id}`);
  
      const workoutSummary = {
        date: formatDate(lastWorkout.day),
        numExercises: lastWorkout.exercises.length,
        ...tallyExercises(lastWorkout.exercises)
      };
  
      renderWorkoutSummary(workoutSummary);
    } else {
      renderNoWorkoutText()
    }
  }
  //Adding exercises into workout summary based on the type of exercise
  function tallyExercises(exercises) {
    const tallied = exercises.reduce((acc, curr) => {
      acc.totalDuration = (acc.totalDuration || 0) + curr.duration;
      if (curr.type === "resistance") {
        acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
        acc.totalSets = (acc.totalSets || 0) + curr.sets;
        acc.totalReps = (acc.totalReps || 0) + curr.reps;
      } else if (curr.type === "cardio") {
        acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
      }
      return acc;
    }, {});
    return tallied;
  }
  
  function formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
  
    return new Date(date).toLocaleDateString(options);
  }
  //Displaying a modal with workout summary
  function renderWorkoutSummary(summary) {
    const container = document.querySelector(".workout-stats");
  
    const workoutKeyMap = {
      date: "Date",
      totalDuration: "Total Workout Duration",
      numExercises: "Exercises Performed",
      totalWeight: "Total Weight Lifted",
      totalSets: "Total Sets Performed",
      totalReps: "Total Reps Performed",
      totalDistance: "Total Distance Covered"
    };
  
    Object.keys(summary).forEach(key => {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
  
      strong.textContent = workoutKeyMap[key];
      const textNode = document.createTextNode(`: ${summary[key]}`);
  
      p.appendChild(strong);
      p.appendChild(textNode);
  
      container.appendChild(p);
    });
  }
  //Displaying modal saying "No workout created!"
  function renderNoWorkoutText() {
    const container = document.querySelector(".workout-stats");
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = "You have not created a workout yet!"
  
    p.appendChild(strong);
    container.appendChild(p);
  }
  //console.log(name);
  initWorkout();
  