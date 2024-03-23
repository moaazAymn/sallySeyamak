const {createApp} = Vue;

createApp({
    data() {
        return {
            classrooms: [],
            selectedClassroom : null,
            allDepartments: [],
            departments: [],
            selectedDepartment: DEPARTMENT_ID??null,
            cities: [],
            city_id: CITY_ID??null,
            areas: [],
            area_id: AREA_ID??null,
            selectedSchoolType: SCHOOL_TYPE??null,
        }
    },
    mounted() {
        this.getCities();
        this.getDepartments();
        this.getClassRooms();
    },
    created() {
        this.init();
    },
    watch:{
        selectedClassroom: {
            handler(value) {
                if (value !== null) {
                    let classroom = this.classrooms.filter(classroom => {
                        return classroom.id === value;
                      });

                    this.departments = classroom[0].departments;

                }

            },
            immediate: false,
        }
    },
    methods: {
        init() {
             runInputmask();
        },
        getDepartments() {
            axios.post('/request/departments')
                .then(response => {
                    this.allDepartments = response.data;
                })
                .catch((error) => {
                    console.log(error);
                      let errors = error.response.data.errors;
                      if (errors) {
                          Swal.fire({
                              icon: 'error',
                              text: errors[0],
                          })
                      }
                }).finally(() => {

                })

        },
        getClassRooms() {
            axios.post('/request/classrooms')
                .then(response => {
                    this.classrooms = response.data.data;
                    if (CLASSROOM_ID) {
                        this.selectedClassroom = CLASSROOM_ID;
                    }
                })
                .catch((error) => {
                    console.log(error);
                      let errors = error.response.data.errors;
                      if (errors) {
                          Swal.fire({
                              icon: 'error',
                              text: errors[0],
                          })
                      }
                }).finally(() => {

                })
        },
        getCities() {
            axios.post('/request/cities')
                .then(response => {
                    this.cities = response.data.data;
                    this.getAreas();
                })
                .catch((error) => {
                    console.log(error);
                      let errors = error.response.data.errors;
                      if (errors) {
                          Swal.fire({
                              icon: 'error',
                              text: errors[0],
                          })
                      }
                }).finally(() => {
                   tail.select("#select-city", {
                        search: true,
                        animate: true,
                        classNames:'d-block form-control',
                    });
                })

        },
        getAreas() {
            if (this.city_id in this.cities){

                $.when(this.areas = this.cities[this.city_id].areas)
                .then(() => {
                     tail.select("#select-area", {
                        search: true,
                        animate: true,
                        classNames:'d-block form-control',
                    }).reload();
                });
            }
        }
    }
}).mount('#register')
