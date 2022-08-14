
export class Setable {
	private _map: Map<any, any> = new Map();

	public set(key: any, value: any): void {
		this._map.set(key, value);
	}

	public get(key: any): any {
		return this._map.get(key);
	}

	public delete(key: any): boolean {
		return this._map.delete(key);
	}
}