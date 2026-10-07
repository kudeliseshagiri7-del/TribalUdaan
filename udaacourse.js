function continueCourse(courseName) {

    alert(
        "📚 Opening " +
        courseName +
        " course..."
    );

    showPage("progress");
}


function searchCourses() {

    const search =
        document.getElementById("courseSearch")
        .value
        .toLowerCase();

    const courses =
        document.querySelectorAll(".course-card");

    courses.forEach(course => {

        const text =
            course.textContent.toLowerCase();

        if (text.includes(search)) {
            course.style.display = "block";
        } else {
            course.style.display = "none";
        }

    });
}