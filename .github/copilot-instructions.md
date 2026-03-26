## Quick context

- Architecture: Django REST backend (Backend/project) + React frontend (frontend/ created with CRA). The backend exposes ModelViewSet-based APIs and uses token auth; the frontend runs on port 3000 and talks to the API on port 8000 by default.

## Where to look (high-value files)

- Backend settings and env: `Backend/project/project/settings.py` (DB is MySQL, CORS configured for localhost:3000). Do NOT hardcode secrets when changing code.
- Backend entry: `Backend/project/manage.py`
- Main app: `Backend/project/app/` — read `models.py`, `serializers.py`, `views.py`, `urls.py` and `migrations/` to understand data shapes and API behavior.
- Media: `Backend/project/media/product_images/` (product image uploads live under MEDIA_ROOT).
- Frontend: `frontend/` — `package.json`, `src/`; key files: `src/context/{AuthContext.jsx,CartContext.jsx,WishlistContext.jsx}`, `src/pages/*` (home, tops, bottoms, sets, Cart, ProductDetails).

## Key patterns and conventions (project-specific)

- DRF + DefaultRouter: `app/urls.py` registers routes like `/home/`, `/sets/`, `/tops/`, `/bottoms/`, `/cartitems/`, `/wishlistItems/` and user/profile routes. Token auth is available at `/api-token-auth/`.
- Permission pattern: Many ViewSets use `permissions.IsAuthenticated` and override `get_queryset()` to return objects scoped to `request.user`. Always include auth when writing code or tests that mutate user-scoped resources.
- Generic relations for products: `Cartitems` and `wishlistItems` use Django `ContentType` to point at multiple product models; POST payloads require both `product_id` (or `product`) and a `category` string (one of `home`, `sets`, `tops`, `bottoms`). Example: {"product_id": 12, "category": "tops", "quantity": 2}.
- Frontend state: global state is handled through React Contexts in `src/context/` (Auth, Cart, Wishlist). Components import these contexts directly rather than prop-drilling.

## Useful commands (what actually works here)

Backend (Windows PowerShell):

```powershell
# create virtualenv
python -m venv .venv
.\.venv\Scripts\Activate.ps1
# install dependencies (there is no requirements.txt in repo — install packages below or create one)
pip install django==5.2.6 djangorestframework djangorestframework-simplejwt django-cors-headers mysqlclient
# run migrations and server
cd Backend\project
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Frontend:

```powershell
cd frontend
npm install
npm start    # dev server on http://localhost:3000
```

API examples (use token auth for protected endpoints):

- Obtain token: POST /api-token-auth/ with {"username":"...","password":"..."} -> {"token":"..."}
- Add item to cart (authenticated): POST /cartitems/ with JSON {"product_id": 5, "category": "tops", "quantity": 1}
- Get home products: GET /home/

## Testing / debugging notes

- There is an `app/tests.py` file; run `python manage.py test` from `Backend/project` to run Django tests.
- No global `requirements.txt` was found — create one from your venv with `pip freeze > requirements.txt` to make CI reproducible.

## Small gotchas for code-editing agents

- Do not assume a single Product model — there are multiple product tables (`Home`, `Sets`, `Tops`, `Bottoms`) referenced by category strings.
- Cart and Wishlist creation endpoints expect `category` + `product`/`product_id` (see `views.py` create methods) and will use ContentType to resolve the target model.
- Many endpoints filter by `request.user` inside `get_queryset()`; when writing migrations, tests or scripts that create user-scoped objects, create or attach a User instance explicitly.
- CORS is permissive for localhost in `settings.py` (good for local dev); production deployment will need a stricter configuration and removal of DEBUG/secret leakage.

## If you change settings

- Replace secrets in `settings.py` with environment variable usage (os.environ.get(...)) and document in README. Right now the repo contains plaintext SECRET_KEY and DB credentials — avoid copying these into issue comments or commits.

---

If any of this is incomplete or you'd like the file to include CI snippets, specific test examples, or example curl/HTTP requests for every endpoint, tell me which area to expand and I'll update the file.
