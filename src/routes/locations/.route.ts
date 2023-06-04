/* Import modules */
import { Router, Request, Response } from "express";

// Export router
export default (urlName: string, data: any): Router => {
  const api = Router();

  // Random
  api.get(`/${urlName}random`, (req: Request, res: Response) => {
    let searchData: any = [];

    searchData.push(
      data.locations[
        Math.round(Math.random() * (data.locations.length - 1) + 0)
      ]
    );

    if (searchData.length == 0) {
      res.status(404).json(null);
    } else {
      res.status(200).json(searchData);
    }
  });

  // Search
  api.get(`/${urlName}`, (req: Request, res: Response) => {
    let searchData = [];

    if (req.query.id) {
      searchData = data.locations.filter(
        (l: any) => l.id == String(req.query.id).toLowerCase()
      );
    } else if (req.query.search) {
      searchData = data.locations.filter((l: any) =>
        String(l.name)
          .toLowerCase()
          .includes(String(req.query.search).toLowerCase())
      );
    } else {
      searchData = data.locations;
    }

    if (searchData.length == 0) {
      res.status(404).json(null);
    } else {
      res.status(200).json(searchData);
    }
  });

  return api;
};
