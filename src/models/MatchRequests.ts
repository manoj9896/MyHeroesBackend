import { Request } from 'express';
import QueryString = require("qs")

export interface RecentMatchRequest extends Request {
    query: QueryString.ParsedQs & {
        timestampPointer?: number;
      };
}
