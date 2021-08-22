import axios from 'axios'
import qs from 'qs'

export const getAllCovidVaccinationData = () => {
  const requestData = {
    'f': 'json',
    'cacheHint': true,
    'groupByFieldsForStatistics': "CAST(EXTRACT(YEAR FROM date + (CASE  WHEN date BETWEEN timestamp '2021-02-01 00:00:00' AND timestamp '2021-03-28 00:59:59' THEN +INTERVAL '1:59:59' HOUR TO SECOND WHEN date BETWEEN timestamp '2021-03-28 01:00:00' AND timestamp '2021-08-20 00:00:00' THEN +INTERVAL '2:59:59' HOUR TO SECOND END)) AS VARCHAR(4)) || '-' || CAST(EXTRACT(MONTH FROM date + (CASE  WHEN date BETWEEN timestamp '2021-02-01 00:00:00' AND timestamp '2021-03-28 00:59:59' THEN +INTERVAL '1:59:59' HOUR TO SECOND WHEN date BETWEEN timestamp '2021-03-28 01:00:00' AND timestamp '2021-08-20 00:00:00' THEN +INTERVAL '2:59:59' HOUR TO SECOND END)) AS VARCHAR(2)) || '-' || CAST(EXTRACT(DAY FROM date + (CASE  WHEN date BETWEEN timestamp '2021-02-01 00:00:00' AND timestamp '2021-03-28 00:59:59' THEN +INTERVAL '1:59:59' HOUR TO SECOND WHEN date BETWEEN timestamp '2021-03-28 01:00:00' AND timestamp '2021-08-20 00:00:00' THEN +INTERVAL '2:59:59' HOUR TO SECOND END)) AS VARCHAR(2))",
    'outFields': "object_id,all_cum,date",
    'outStatistics': `[{"onStatisticField":"all_cum","outStatisticFieldName":"value","statisticType":"sum"}]`,
    'resultType': "standard",
    'returnGeometry': false,
    'spatialRel': 'esriSpatialRelIntersects',
    'where': "(date>=timestamp '2021-01-31 22:00:00') AND (vaccination_state='Visi') AND (municipality_order='00') AND ((date BETWEEN timestamp '2021-02-01 00:00:00' AND timestamp '2021-03-28 00:59:59' OR date BETWEEN timestamp '2021-03-28 01:00:00' AND timestamp '2021-08-20 00:00:00'))"
  }

  return axios.post('https://services3.arcgis.com/MF53hRPmwfLccHCj/arcgis/rest/services/covid_vaccinations_chart_new/FeatureServer/0/query', qs.stringify(requestData))
}
