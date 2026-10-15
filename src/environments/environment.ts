/**
 * Contains environment-specific API endpoints.
 *
 * @author u20241d945
 */
export const environment = {
  production: true,
  monitoringApiBaseUrl: 'http://localhost:3000',
  monitoringStationsEndpointPath: '/water-monitoring-stations',
  waterQualityItemsEndpointPath: '/water-quality-items',
  regionalOperatorsApiBaseUrl: 'https://dummyjson.com',
  regionalOperatorsEndpointPath: '/users?limit=100'
};
