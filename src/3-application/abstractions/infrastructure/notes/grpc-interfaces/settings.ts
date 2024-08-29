import { Observable } from "rxjs";
import { Empty } from "./generics";

interface SettingsGrpcInterfaces {
  DeleteCompletedItems (message: Empty): Observable<Empty>;
  DeleteAllItems (message: Empty): Observable<Empty>;
  PostCanvas (message: Empty): Observable<Empty>;
}
export {
  SettingsGrpcInterfaces,
}