import api from '@/api/api';

export class BaseService<Entity> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Build the full URL for a request, including parentUrl and resource-specific paths.
   */
  private buildUrl(path: string | number = '', parentUrl?: string): string {
    // if path has '/' char then return
    if (typeof path === 'string' && path.includes('/')) {
      return path;
    }
    if (parentUrl) {
      return `${parentUrl}/${this.endpoint}/${path}`.replace(/\/+$/, '');
    }
    return `/api/${this.endpoint}/${path}`.replace(/\/+$/, '');
  }

  /**
   * Generic GET method for lists.
   */
  async getList(filters?: Record<string, unknown>, parentUrl?: string, page: number = 1): Promise<{ items: Entity[], totalItems: number, view: any }> {
    const queryString = filters
      ? `?${new URLSearchParams({ ...filters, page: page.toString() } as Record<string, string>).toString()}`
      : `?page=${page}`;
    const url = this.buildUrl('', parentUrl) + queryString;
    const { data } = await api.get<{ 'hydra:member': Entity[], 'hydra:totalItems': number, 'hydra:view': any }>(url);
    return {
      items: data['hydra:member'],
      totalItems: data['hydra:totalItems'],
      view: data['hydra:view']
    };
  }

  /**
   * Generic GET method for a single resource.
   */
  async getDetail(iri: string): Promise<Entity> {
    const url = this.buildUrl(iri);
    const { data } = await api.get<Entity>(url);
    return data;
  }

  /**
   * Generic POST method for creating a resource.
   */
  async create(data: Omit<Entity, '@id'>, parentUrl?: string): Promise<Entity> {
    const url = this.buildUrl('', parentUrl);
    const { data: response } = await api.post<Entity>(url, data);
    return response;
  }

  /**
   * Generic PATCH method for updating a resource.
   */
  async update(iri: string, updates: Partial<Entity>): Promise<Entity> {
    const { data } = await api.patch<Entity>(iri, updates);
    return data;
  }

  /**
   * Generic DELETE method for removing a resource.
   */
  async delete(iri: string): Promise<void> {
    await api.delete(iri);
  }
}
