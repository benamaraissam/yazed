from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="YAZED")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Product data
PRODUCTS = [
    {
        "id": 1,
        "slug": "shampoing-gel-douche-solide",
        "title": "Shampoing & Gel douche solide",
        "price": 3200,
        "price_formatted": "32.000 DT",
        "collection": "shampoing",
        "images": [
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-15.jpg?v=1775137237",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-16_1f8adcda-5031-4460-934c-69dab7d23fe8.jpg?v=1775137237",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-20.jpg?v=1775137237",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-34.jpg?v=1775137237",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-2.jpg?v=1775137237",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-78_905d3b1a-ff8f-4e1b-929d-5216049f83e3.jpg?v=1775137237",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-47.jpg?v=1775137237",
        ],
        "description": "Yazed – Shampoing & Gel douche solide 2 en 1. Naturel, efficace & éco-responsable.",
        "in_stock": 500,
        "features": [
            "98% d'ingrédients d'origine végétale",
            "Au collagène végétal et à la biotine",
            "Bye Bye Pellicules",
            "Sans plastique, sans eau, sans sulfates, sans parabens",
            "Emballage biodégradable et zéro déchet non recyclable",
            "Fabriqué en Tunisie",
        ],
        "benefits": [
            {"title": "Collagène végétal", "text": "aide à renforcer la structure des cheveux, améliore leur élasticité et limite la casse."},
            {"title": "Biotine", "text": "stimule la croissance capillaire et favorise des cheveux plus forts et plus résistants."},
            {"title": "Beurre de coco", "text": "nettoie en douceur, apporte une mousse onctueuse et protège le cuir chevelu."},
            {"title": "Extrait de soja", "text": "renforce la fibre capillaire et redonne brillance aux cheveux ternes."},
            {"title": "Base végétale", "text": "donne une texture agréable et facilite l'application."},
            {"title": "Senteur miel-coco", "text": "une senteur douce et gourmande qui transforme chaque douche en moment de plaisir."},
        ],
        "weight": "70 g",
        "testimonials": [
            {"name": "Amel", "text": "من أول استعمال حسّيت الفرق. ريحتو بنييينة ويرغي كي الشامبو العادي. نحبّو برشا."},
            {"name": "Leila", "text": "Simple, efficace et zéro plastique. Exactement ce que je cherchais pour ma salle de bain."},
            {"name": "Karim", "text": "Je ne pensais pas voir une différence aussi vite. شعري ولى أحسن وما عادش عندي قشرة. Produit Top."},
        ],
        "steps": [
            {"num": 1, "title": "Mouillez", "text": "Mouillez vos cheveux et votre corps."},
            {"num": 2, "title": "Frottez", "text": "Frottez le pain solide pour activer la mousse."},
            {"num": 3, "title": "Massez", "text": "Massez en douceur."},
            {"num": 4, "title": "Rincez", "text": "Rincez abondamment."},
        ],
    },
    {
        "id": 2,
        "slug": "porte-savon-magnetique-mural",
        "title": "Porte-savon magnétique mural",
        "price": 1900,
        "price_formatted": "19.000 DT",
        "collection": "accessoires",
        "images": [
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Gemini_Generated_Image_64jhun64jhun64jh.png?v=1770649450",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Artboard_1_copy_be28bcdb-d8a7-4a83-89bc-724dd10c1c18.png?v=1770649450",
        ],
        "description": "Le porte-savon magnétique mural permet de garder votre shampoing et gel douche solide propre, sec et toujours à portée de main. Facile à installer sans perçage, il optimise l'espace et prolonge la durée de vie de votre shampoing et gel douche solide.",
        "in_stock": 500,
        "features": [
            "Zéro plastique",
            "Éco-friendly & durable",
            "Hygiène responsable",
        ],
        "benefits": [
            {"title": "Zéro plastique", "text": "Sans emballage plastique, pour une salle de bain plus responsable."},
            {"title": "Éco-friendly & durable", "text": "Matériaux résistants, conçus pour durer."},
            {"title": "Hygiène responsable", "text": "Compatible avec une routine solide et anti-gaspillage."},
        ],
        "details": [
            "Matériau : Acier inoxydable",
            "Fonction : Maintient le shampoing et gel douche solide au sec et à portée de main.",
            "Installation : Fixation murale sans perçage, souvent avec un adhésif puissant ou une ventouse.",
            "Fonctionnement : Une petite capsule dentelée est enfoncée dans le shampoing et gel douche solide, permettant de le fixer magnétiquement au support mural, le gardant ainsi au sec.",
            "Durabilité : Résistant à l'humidité et à la corrosion",
            "Usage pratique : Optimise l'espace sur le lavabo ou dans la douche",
            "Compatibilité : Convient à tous les shampoings et gels douche solides",
        ],
        "testimonials": [
            {"name": "Amel", "text": "من أول استعمال حسّيت الفرق. ريحتو بنييينة ويرغي كي الشامبو العادي. نحبّو برشا."},
            {"name": "Leila", "text": "Simple, efficace et zéro plastique. Exactement ce que je cherchais pour ma salle de bain."},
            {"name": "Karim", "text": "Je ne pensais pas voir une différence aussi vite. شعري ولى أحسن وما عادش عندي قشرة. Produit Top."},
        ],
    },
    {
        "id": 3,
        "slug": "sac-a-savon-eponge-de-luffa",
        "title": "Sac à savon & éponge de luffa",
        "price": 1500,
        "price_formatted": "15.000 DT",
        "collection": "accessoires",
        "images": [
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-84_5299aff7-239a-490e-9584-973caa765ac9.jpg?v=1766744552",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Artboard_1_copy_2.png?v=1770646269",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Artboard_1_copy.png?v=1770646270",
        ],
        "description": "Le sac à savon Yazed est un accessoire 2 en 1 naturel fabriqué à partir de fibres 100 % naturelles issues de la plante Agave sisalana, conçu pour transporter facilement votre shampoing et gel douche solide lors de vos déplacements (salle de sport, voyage, week-end…). Une fois mouillé, il se transforme en véritable éponge de luffa, permettant de nettoyer la peau en douceur, d'exfolier légèrement et d'éliminer les cellules mortes.",
        "in_stock": 500,
        "features": [
            "Zéro plastique",
            "2 en 1 naturel",
            "Anti-gaspillage",
            "Exfoliation douce",
        ],
        "benefits": [
            {"title": "Zéro plastique", "text": "Sac biodégradable, sans plastique, pour une salle de bain plus responsable."},
            {"title": "2 en 1 naturel", "text": "Transportez votre shampoing et gel douche solide et transformez le sac en éponge de luffa."},
            {"title": "Anti-gaspillage", "text": "Utilise le shampoing et gel douche solide jusqu'au bout."},
            {"title": "Exfoliation douce", "text": "Texture naturelle qui nettoie et exfolie la peau en douceur."},
        ],
        "details": [
            "Type : Sac à savon & éponge de luffa 2 en 1",
            "Matière : Fabriqué à partir de fibres 100 % naturelles issues de la plante Agave sisalana.",
            "Fonction : Transport du shampoing et gel douche solide + nettoyage et exfoliation douce",
            "Utilisation : Corps",
            "Texture : Naturelle et légèrement exfoliante",
            "Public : Convient aux hommes et aux femmes",
            "Usage : Quotidien, voyage, salle de sport",
            "Entretien : Rincer après usage et laisser sécher à l'air libre",
            "Engagement : Zéro plastique, biodégradable et éco-friendly",
        ],
        "testimonials": [
            {"name": "Amel", "text": "من أول استعمال حسّيت الفرق. ريحتو بنييينة ويرغي كي الشامبو العادي. نحبّو برشا."},
            {"name": "Leila", "text": "Simple, efficace et zéro plastique. Exactement ce que je cherchais pour ma salle de bain."},
            {"name": "Karim", "text": "Je ne pensais pas voir une différence aussi vite. شعري ولى أحسن وما عادش عندي قشرة. Produit Top."},
        ],
    },
]

COLLECTIONS = [
    {"slug": "all", "title": "Produits", "products": [1, 2, 3]},
    {"slug": "shampoing", "title": "Shampoing & Douche Solide", "products": [1]},
    {"slug": "accessoires", "title": "Accessoires", "products": [2, 3]},
]

# In-memory cart store
carts = {}

class CartItem(BaseModel):
    product_id: int
    quantity: int
    title: str
    price: int
    image: str

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@app.get("/api/products")
async def get_products():
    return PRODUCTS

@app.get("/api/products/{slug}")
async def get_product(slug: str):
    for p in PRODUCTS:
        if p["slug"] == slug:
            return p
    return {"error": "Product not found"}

@app.get("/api/collections")
async def get_collections():
    return COLLECTIONS

@app.get("/api/collections/{slug}")
async def get_collection(slug: str):
    for c in COLLECTIONS:
        if c["slug"] == slug:
            products = [p for p in PRODUCTS if p["id"] in c["products"]]
            return {**c, "products": products}
    return {"error": "Collection not found"}

@app.get("/api/cart/{session_id}")
async def get_cart(session_id: str):
    return carts.get(session_id, [])

@app.post("/api/cart/{session_id}")
async def add_to_cart(session_id: str, item: CartItem):
    if session_id not in carts:
        carts[session_id] = []
    # Check if item already exists
    for existing in carts[session_id]:
        if existing["product_id"] == item.product_id:
            existing["quantity"] += item.quantity
            return carts[session_id]
    carts[session_id].append(item.dict())
    return carts[session_id]

@app.delete("/api/cart/{session_id}/{product_id}")
async def remove_from_cart(session_id: str, product_id: int):
    if session_id in carts:
        carts[session_id] = [i for i in carts[session_id] if i["product_id"] != product_id]
    return carts.get(session_id, [])

@app.put("/api/cart/{session_id}/{product_id}")
async def update_cart_quantity(session_id: str, product_id: int, quantity: int):
    if session_id in carts:
        for item in carts[session_id]:
            if item["product_id"] == product_id:
                item["quantity"] = quantity
                break
    return carts.get(session_id, [])

@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    # In a real app, send email here
    return {"success": True, "message": "Merci pour votre message ! Nous vous répondrons sous peu."}

@app.get("/api/hello")
async def hello():
    return {"message": "YAZED API is running"}

_STATIC = Path(__file__).parent / "static"
if _STATIC.is_dir():
    app.mount("/", StaticFiles(directory=str(_STATIC), html=True), name="static")
