<template>
  <div>
    <TabView class="tabview-custom" ref="tabview4">
      <TabPanel>
        <template #header>
          <b-icon-pie-chart style="font-size: 18px; margin: 3px" />
          <span><h4>Departments by # of Applications</h4></span>
        </template>
        <div class="container-...">
          <div class="row row-cols-auto auto-cols-adj">
            <Card class="component-card">
              <template v-slot:title> Treemap </template>
              <template v-slot:subtitle>
                Departments by # of Applications as Treemap representation
              </template>
              <template v-slot:content>
                <div class="p-fluid">
                  <div id="chart-treemap">
                    <apexchart
                      type="treemap"
                      height="350"
                      :options="chartOptions"
                      :series="deparmtentApplicationRankingData"
                    ></apexchart>
                  </div>
                </div>
              </template>
              <template v-slot:footer> </template>
            </Card>
            <Card class="component-card">
              <template v-slot:title> BarChart </template>
              <template v-slot:subtitle>
                Departments by # of Applications as BarChart representation
              </template>
              <template v-slot:content>
                <div class="p-fluid">
                  <div id="chart-bar">
                    <apexchart
                      type="bar"
                      height="350"
                      :options="chartOptions"
                      :series="deparmtentApplicationRankingData"
                    ></apexchart>
                  </div>
                </div>
              </template>
              <template v-slot:footer> </template>
            </Card>
            <Card class="component-card centered-chart">
              <template v-slot:title> PieChart </template>
              <template v-slot:subtitle>
                Departments by # of Applications as PieChart representation
              </template>
              <template v-slot:content>
                <div class="p-fluid">
                  <div id="chart-pie">
                    <apexchart
                      type="pie"
                      width="800"
                      min-height="650"
                      :options="chartOptionsPieChart"
                      :series="deparmtentApplicationRankingDataPieChart"
                    ></apexchart>
                  </div>
                </div>
              </template>
              <template v-slot:footer> </template>
            </Card>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <b-icon-compass style="font-size: 18px; margin: 3px" />
          <span><h4>Examine Application Status</h4></span>
        </template>
        <div class="container-...">
          <div class="row row-cols-auto auto-cols-adj">
            <Card class="component-card centered-chart">
              <template v-slot:title> ApplicationRadar </template>
              <template v-slot:subtitle>
                # of Key Characteristics of multiple Apps
              </template>
              <template v-slot:content>
                <span v-if="retrievingGraph == false">
                  <form>
                    <MultiSelect
                      v-model="selected_apps"
                      :options="apps"
                      :filter="true"
                      optionLabel="app"
                      placeholder="Select Applications"
                      filterPlaceholder="Find an Application"
                      class="multiselect-custom"
                      :showClear="true"
                    />

                    <Button
                      label="Apply"
                      @click="getRadarDataMultiple"
                      icon="pi pi-check"
                      iconPos="right"
                    />
                  </form>
                  <div class="p-fluid">
                    <div id="chart">
                      <apexchart
                        type="radar"
                        width="1200"
                        :options="chartOptionsRadarMultiple"
                        :series="radarDataMultiple"
                      ></apexchart>
                    </div>
                  </div>
                </span>
                <span v-else>
                  <ProgressBar mode="indeterminate" />
                </span>
              </template>
            </Card>
            <Card class="component-card centered-chart">
              <template v-slot:title> ApplicationRadar </template>
              <template v-slot:subtitle>
                # of Key Characteristics of a single App
              </template>
              <template v-slot:content>
                <form>
                  <Dropdown
                    v-model="selected_app"
                    :options="apps"
                    optionLabel="app"
                    placeholder="Select an Application"
                    :filter="true"
                    filterPlaceholder="Find an Application"
                    :showClear="true"
                  />
                  <Button
                    label="Apply"
                    @click="getRadarData"
                    icon="pi pi-check"
                    iconPos="right"
                  />
                </form>
                <div class="p-fluid">
                  <div id="chart-radar">
                    <apexchart
                      type="radar"
                      width="1200"
                      :options="chartOptionsRadar"
                      :series="radarData"
                    ></apexchart>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <b-icon-columns style="font-size: 18px; margin: 3px" />
          <span><h4>Analyze Architecture Views Applicability</h4></span>
        </template>
        <div class="container-...">
          <div class="row row-cols-auto auto-cols-adj">
            <Card class="component-card">
              <template v-slot:title> Department Selection </template>
              <template v-slot:subtitle>
                Select Department to examine
              </template>
              <template v-slot:content>
                <div class="p-fluid">
                  <Dropdown
                    v-model="selected_dep_from_dataset"
                    :options="deps_from_dataset"
                    optionLabel="dep"
                    placeholder="Select a Department"
                    :filter="true"
                    filterPlaceholder="Find a Department"
                    :showClear="true"
                  />
                </div>
              </template>
              <template v-slot:footer> </template>
            </Card>
            <Card class="component-card">
              <template v-slot:title> Architecture Views Selection </template>
              <template v-slot:subtitle>
                Select Architecture Views to apply
              </template>
              <template v-slot:content>
                <div class="p-fluid">
                  <Dropdown
                    v-model="selected_architecture_view"
                    :options="architecture_views"
                    optionLabel="architecture_view"
                    placeholder="Select a Architecture View"
                    :filter="true"
                    filterPlaceholder="Find a Architecture View"
                    :showClear="true"
                  />
                </div>
              </template>
              <template v-slot:footer> </template>
            </Card>
          </div>
          <br />
          <div class="p-grid">
            <div class="p-col-4 p-offset-4">
              <div class="p-fluid">
                <Button
                  label="Start Applicability Analysis"
                  @click="applyArchitectureViewAnalysis()"
                />
              </div>
            </div>
          </div>
          <div class="container-..." v-if="showApplicabilityAnalysis">
            <div class="row row-cols-auto auto-cols-adj">
              <Card class="component-card">
                <template v-slot:title> Applicability Analysis </template>
                <template v-slot:subtitle>
                  This Analysis shows the current maintainance level of EAM Data
                  regarding the selected Architecture View for the selected
                  Department
                </template>
                <template v-slot:content>
                  <div class="p-fluid">
                    <div id="chartBarArchitectureView">
                      <apexchart
                        type="bar"
                        height="400"
                        :options="chartOptionsArchitectureView"
                        :series="architecture_view_bar_data"
                      ></apexchart>
                    </div>
                  </div>
                </template>
                <template v-slot:footer> </template>
              </Card>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <b-icon-upc style="font-size: 18px; margin: 3px" />
          <span><h4>Architecture Views</h4></span>
        </template>
        <div class="container-...">
          <div class="row row-cols-auto auto-cols-adj">
            <Card class="component-card">
              <template v-slot:title> Architecture Views </template>
              <template v-slot:subtitle>
                Table with all available Architecture Views
              </template>
              <template v-slot:content>
                <div class="p-fluid" @deleted="getArchitectureViews()">
                  <table-architecture-views
                    :key="componentKey"
                  ></table-architecture-views>
                </div>
              </template>
              <template v-slot:footer> </template>
            </Card>
            <Card class="component-card">
              <template v-slot:title> Create Architecture View </template>
              <template v-slot:subtitle>
                Create individual Architecture Views based on your needs
              </template>
              <template v-slot:content>
                <form>
                  <div class="p-fluid">
                    <div class="p-inputgroup">
                      <span class="p-inputgroup-addon">
                        <b-icon-upc />
                      </span>
                      <InputText
                        placeholder="Name"
                        v-model="create_architecture_view_name"
                      />
                    </div>
                    <br />
                    <div class="p-inputgroup">
                      <span class="p-inputgroup-addon">
                        <b-icon-journal-text />
                      </span>
                      <InputText
                        placeholder="Description"
                        v-model="create_architecture_view_description"
                      />
                    </div>
                    <br />
                    <MultiSelect
                      v-model="selected_architecture_view_components"
                      :options="architecture_view_components"
                      optionLabel="architecture_view_component"
                      placeholder="Select a Architecture View Component"
                      :filter="true"
                      filterPlaceholder="Find a Architecture View Component"
                      class="multiselect-custom"
                    />
                    <br />

                    <div class="p-grid p-nogutter p-justify-between">
                      <Button
                        label="Create Architecture View"
                        @click="createArchitectureView()"
                      />
                    </div>
                  </div>
                </form>
              </template>
              <template v-slot:footer> </template>
            </Card>
          </div>
        </div>
      </TabPanel>
    </TabView>
    <div class="p-grid p-nogutter p-justify-between">
      <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
    </div>
    <br />
  </div>
</template>
<script>
import TableArchitectureViews from "../components/TableArchitectureViews.vue";

export default {
  props: ["selected_dataset"],
  components: {
    "table-architecture-views": TableArchitectureViews,
  },
  data() {
    this.DeparmtentApplicationRankingData();
    this.getApps();
    return {
      componentKey: 0,
      selected_app: "",
      selected_apps: "",
      selected_architecture_view_components: "",
      selected_dep_from_dataset: "",
      selected_architecture_view: "",
      create_architecture_view_description: "",
      create_architecture_view_name: "",
      architecture_views_all: "",
      apps: [],
      retrievingGraph: false,
      showApplicabilityAnalysis: false,
      deps_from_dataset: this.getDepartmentsFromDataset(),
      architecture_views: this.getArchitectureViews(),
      architecture_view_components: this.getComponents(),
      deparmtentApplicationRankingData: [
        {
          data: [{ x: "Initiating...", y: 1 }],
        },
      ],
      chartOptions: {
        legend: {
          show: false,
        },
        title: {
          text: "Departments by # of Applications",
        },
      },
      deparmtentApplicationRankingDataPieChart: [],
      chartOptionsPieChart: {
        chart: {
          type: "pie",
        },
        labels: ["Initiating..."],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {},
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      radarData: [{ data: [1, 1, 1] }],
      chartOptionsRadar: {
        chart: {
          type: "radar",
        },
        title: {},
        xaxis: {
          categories: ["Initiating...", "Initiating...", "Initiating..."],
        },
      },
      radarDataMultiple: [{ data: [1, 1, 1] }],
      chartOptionsRadarMultiple: {
        chart: {
          type: "radar",
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1,
          },
        },
        title: {},
        stroke: {
          width: 2,
        },
        fill: {
          opacity: 0.1,
        },
        markers: {
          size: 0,
        },
        xaxis: {
          categories: ["Initiating...", "Initiating...", "Initiating..."],
        },
      },
      architecture_view_bar_data: [
        {
          name: "Initiating",
          data: [1],
        },
      ],
      chartOptionsArchitectureView: {
        chart: {
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        stroke: {
          colors: ["transparent"],
          width: 10,
        },
        xaxis: {
          categories: ["Initiating..."],
          position: "bottom",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
        title: {
          text: "Applicability Analysis",
          floating: true,
          align: "center",
          style: {
            color: "#444",
            position: "top",
          },
        },
      },
    };
  },
  methods: {
    prevPage() {
      this.$emit("prev-page", { pageIndex: 1 });
    },
    applyArchitectureViewAnalysis() {
      this.showApplicabilityAnalysis = true;
      var selected_architecture_view = "";
      for (let index = 0; index < this.architecture_views_all.length; index++) {
        if (
          this.architecture_views_all[index].name ===
          this.selected_architecture_view.architecture_view
        ) {
          selected_architecture_view = this.architecture_views_all[index]
            .architecture_view_id;
        }
      }
      this.axios
        .post(
          "https://br-eam-backend.herokuapp.com/analyze_applicability/" +
            this.selected_dataset +
            "/" +
            selected_architecture_view +
            "/" +
            this.selected_dep_from_dataset.dep
        )
        .then((res) => {
          this.architecture_view_bar_data = res.data[0];
          this.updateDataLabelsArchitecureViewBar(res.data[1]);
          this.$toast.add({
            severity: "success",
            summary: "Architecture View Applicability Analysis Successful",
            detail:
              "The Architecture View Applicability Analysis was successful",
            life: 3000,
          });
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "Architecture View Applicability Analysis Unsuccessful",
            detail: "Select Parameters OR  click Back and re-select a dataset!",
            life: 3000,
          });
        });
    },
    createArchitectureView() {
      this.submitted = true;
      this.formData = new FormData();
      this.formData.append("name", this.create_architecture_view_name);
      this.formData.append(
        "description",
        this.create_architecture_view_description
      );
      var components_string = "";
      for (
        let index = 0;
        index < this.selected_architecture_view_components.length;
        index++
      ) {
        components_string += this.selected_architecture_view_components[index]
          .architecture_view_component;
        if (index < this.selected_architecture_view_components.length - 1) {
          components_string += ",";
        }
      }
      this.formData.append("components", components_string);
      this.axios
        .post(
          "https://br-eam-backend.herokuapp.com/create_architecture_view",
          this.formData
        )
        .then(() => {
          this.$toast.add({
            severity: "success",
            summary: "Architecture View Creation Successful",
            detail: "The selected Architecture View was created",
            life: 3000,
          });
          this.getArchitectureViews();
          this.componentKey += 1;
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "Architecture View Creation Unsuccessful",
            detail: "Check if Architecture View Name already exists",
            life: 3000,
          });
        });
    },
    getArchitectureViews() {
      this.axios
        .get("https://br-eam-backend.herokuapp.com/get_architecture_views")
        .then((res) => {
          this.architecture_views_all = res.data.data;
          var data_tmp = [];
          for (let index = 0; index < res.data.data.length; index++) {
            data_tmp.push({
              architecture_view: res.data.data[index].name,
            });
          }
          this.architecture_views = data_tmp;
        });
    },
    getDepartmentsFromDataset() {
      this.axios
        .get(
          "https://br-eam-backend.herokuapp.com/get_departments_from_dataset/" +
            this.selected_dataset
        )
        .then((res) => {
          var data_tmp = [{ dep: "All" }];
          for (let index = 0; index < res.data.data.length; index++) {
            if (res.data.data[index] !== null) {
              data_tmp.push({ dep: res.data.data[index] });
            }
          }
          this.deps_from_dataset = data_tmp;
        });
    },
    getComponents() {
      this.axios
        .get(
          "https://br-eam-backend.herokuapp.com/get_components/" +
            this.selected_dataset
        )
        .then((res) => {
          var data_tmp = [];
          for (let index = 0; index < res.data.data.length; index++) {
            data_tmp.push({
              architecture_view_component: res.data.data[index],
            });
          }
          this.architecture_view_components = data_tmp;
        });
    },
    DeparmtentApplicationRankingData() {
      this.axios
        .get(
          "https://br-eam-backend.herokuapp.com/get_data_for_treemap_ranking/" +
            this.selected_dataset
        )
        .then((res) => {
          this.deparmtentApplicationRankingData = [{ data: res.data }];
          this.updateDataLabelsPieChart(res.data);
          this.DeparmtentApplicationRankingDataPieChart(res.data);
          this.$toast.add({
            severity: "success",
            summary: "Departments by # of Application Analysis Successful",
            detail:
              "The Departments by # of Application Analysis was successful",
            life: 3000,
          });
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "Departments by # of Application Analysis Unsuccessful",
            detail: "Please click Back and re-select a dataset!",
            life: 8000,
          });
        });
    },
    DeparmtentApplicationRankingDataPieChart(data) {
      for (const key of Object.keys(data)) {
        this.deparmtentApplicationRankingDataPieChart.push(data[key]["y"]);
      }
    },
    getRadarData() {
      this.axios
        .get(
          "https://br-eam-backend.herokuapp.com/get_data_for_radar_app/" +
            this.selected_dataset +
            "/" +
            this.selected_app.app
        )
        .then((res) => {
          var data = res.data[0].data.map(function (x) {
            return parseInt(x);
          });
          this.radarData[0].data = data;
          this.updateDataLabelsRadar(res.data[1].labels);
          this.$toast.add({
            severity: "success",
            summary: "ApplicationRadar Analysis Successful",
            detail: "The ApplicationRadar Analysis was successful",
            life: 3000,
          });
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "ApplicationRadar Analysis Unsuccessful",
            detail: "Select Parameters OR  click Back and re-select a dataset!",
            life: 3000,
          });
        });
    },
    updateDataLabelsRadar(data) {
      this.chartOptionsRadar = {
        ...this.chartOptionsRadar,
        ...{
          xaxis: {
            categories: data,
          },
        },
      };
    },
    updateDataLabelsArchitecureViewBar(data) {
      this.chartOptionsArchitectureView = {
        ...this.chartOptionsArchitectureView,
        ...{
          xaxis: {
            categories: data,
          },
        },
      };
    },
    updateDataLabelsPieChart(data) {
      var labels = [];
      for (const key of Object.keys(data)) {
        labels.push(data[key]["x"]);
      }
      this.chartOptionsPieChart = {
        ...this.chartOptionsPieChart,
        ...{
          labels: labels,
        },
      };
    },
    getRadarDataMultiple() {
      this.radarDataMultiple = [];
      this.retrievingGraph = true;
      for (let index = 0; index < this.selected_apps.length; index++) {
        var selected_app = this.selected_apps[index].app;
        this.axios
          .get(
            "https://br-eam-backend.herokuapp.com/get_data_for_radar_app/" +
              this.selected_dataset +
              "/" +
              selected_app
          )
          .then((res) => {
            var data = res.data[0].data.map(function (x) {
              return parseInt(x);
            });
            this.radarDataMultiple.push({
              data: data,
              name: this.selected_apps[index].app,
            });
            this.updateChartOptionsRadarMultiple(res.data[1].labels);
            this.$toast.add({
              severity: "success",
              summary: "ApplicationRadar Analysis Successful",
              detail: "The ApplicationRadar Analysis was successful",
              life: 3000,
            });
          })
          .catch(() => {
            this.$toast.add({
              severity: "error",
              summary: "ApplicationRadar Analysis Unsuccessful",
              detail:
                "Select Parameters OR  click Back and re-select a dataset!",
              life: 3000,
            });
          });
      }
    },
    updateChartOptionsRadarMultiple(data) {
      this.chartOptionsRadarMultiple = {
        ...this.chartOptionsRadarMultiple,
        ...{
          xaxis: {
            categories: data,
          },
        },
      };
      this.retrievingGraph = false;
    },
    getApps() {
      this.axios
        .get(
          "https://br-eam-backend.herokuapp.com/get_applications/" +
            this.selected_dataset
        )
        .then((res) => {
          var apps_tmp = [];
          for (let index = 0; index < res.data.length; index++) {
            apps_tmp.push({ app: res.data[index] });
          }
          this.apps = apps_tmp;
        });
    },
  },
};
</script>
<style scoped>
.component-card {
  margin-top: 30px;
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.25rem;
  resize: both;
  overflow: auto;
  margin-right: 10px;
  margin-left: 10px;
}

.centered-chart {
  align-items: center;
}

.p-multiselect {
  max-width: 800px;
}

.p-multiselect-label:not(.p-placeholder) {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.selected-item-value {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  /* display: inline-block; */
  margin-bottom: 0.5rem;
  background-color: var(--primary-color);
  color: var(--primary-color-text);
}

@media screen and (max-width: 900px) {
  .p-multiselect {
    width: 100%;
  }
}
</style>