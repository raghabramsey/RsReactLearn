export class BillMapper{
    async DTOtoModel(m){
        var models = [];
        let ordersjson = [];
        let workerjson = [];
        let accountjson= [];
        for(const o of m.orders){
            var orders={
                ProductId: o.ProductId,
                OrderQuantity: parseInt(o.Quantity),
                OrderPrice: parseInt(o.OrderPrice)
            }
            ordersjson.push(orders)
        }
        for(const w of m.workOrder){
            var workers={
                WorkerId: w.WorkerId,
                Wage: parseInt(w.Wage),
                WorkingDays: parseInt(w.WorkingDays)
            }
            workerjson.push(workers);
        }
        for(const a of m.accounts){
            var account={
                GrandTotal: parseFloat(a.GrandTotal),
                Debit: parseFloat(a.Debit),
                Credit: parseFloat(a.Credit),
                PaymentMethod: a.PaymentMethod
            }
            accountjson.push(account);
        }
        let model={
            BillId: m.billid,
            CustomerId: m.customerid,
            CustomerName: m.customerName,
            CustomerPhone: m.customerPhone,
            CustomerAddress: m.customerAddress,
            orders: ordersjson,
            workers: workerjson,
            account: accountjson


        }
        models.push(model);
        return models;
    }
}