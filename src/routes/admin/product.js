const router = require("express").Router();
const multer = require("multer");

const ProductRepo = require("../../repositories/product");
const productsNewTemplate = require("../../views/admin/product/new");
const productIndexTemplate = require("../../views/admin/product/index");
const productEditTemplate = require("../../views/admin/product/edit");
const { requireTitle, requirePrice } = require("./validators");
const { handleErrors, requireAuth } = require("./middlewares");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await ProductRepo.getAll();
  res.send(productIndexTemplate({ products }));
});

router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const { title, price } = req.body;
    const image = req.file.buffer.toString("base64");

    await ProductRepo.create({
      title,
      price,
      image,
    });

    res.redirect("/admin/products");
  }
);

router.get("/admin/products/:id/edit", requireAuth, async (req, res) => {
  const product = await ProductRepo.getOne(req.params.id);
  if (!product) return res.send("Product not found.");

  res.send(productEditTemplate({ product }));
});

router.post("/admin/products/:id/edit", requireAuth, async (req, res) => {});
module.exports = router;
