export class ServiceRecord {
  constructor(
    public ServiceRecordId?: number,
    public ServiceBy?: string,
    public ServiceCharge?: number,
    public ConditionDescr?: string,
    public IsDelivered?: boolean,
    public VehicleId?: Number
  ) { }
}
