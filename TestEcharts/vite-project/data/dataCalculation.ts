export function averageShipmentValue(data: any[]): number {
  const totalShipmentValue = data.reduce((sum, dataPoint) => {
    const shipmentValue = parseFloat(
      dataPoint["shipment_value"].replace("$", "")
    );
    return sum + shipmentValue;
  }, 0);
  return totalShipmentValue / data.length;
}

export function totalShipmentValue(data: any[]): number {
  const totalShipmentValue = data.reduce((sum, dataPoint) => {
    const shipmentValue = parseFloat(
      dataPoint["shipment_value"].replace("$", "")
    );
    return sum + shipmentValue;
  }, 0);

  return totalShipmentValue;
}

export function totalCapacity(data: any[]): number {
  const totalCapacity = data.reduce((sum, dataPoint) => {
    return (sum += dataPoint["vehicle"]["capacity_kg"]);
  }, 0);
  return totalCapacity;
}

export function totalActive(data: any[]): number {
  let totalActiveShipments = 0;
  for (let dataPoint of data) {
    if (dataPoint["isActive"] == true) {
      totalActiveShipments += 1;
    }
  }
  return totalActiveShipments;
}

export function totalCancelled(data: any[]): number {
  let totalCancelledShipments = 0;
  for (let dataPoint of data) {
    if (dataPoint["shipment_status"] == "Cancelled") {
      totalCancelledShipments += 1;
    }
  }
  return totalCancelledShipments;
}
// shipment_value (average)
// shipment_value (total)
// capacity_kg (total)
// isActive (hoeveel shipments True / False hebben)
// shipment_status (hoeveel shipments op dit moment Cancelled zijn)
