
# Open Source, Licensing and Funding Policy

> **Status:** Product direction approved; license and operational details require final review before public release.
> **Applies to:** BuildTrace web application, native applications, backend and official hosted service.

## 1. Product commitment

BuildTrace is intended to be a genuinely free and open-source project. The source code should be available for inspection, use, modification and self-hosting under the selected open-source license.

The product is not intended to become a subscription business or an advertising-supported service.

## 2. Access and monetization rules

| Area | Policy |
| --- | --- |
| Web application | Free to use |
| Android application | Free to use |
| iOS application | Free to use |
| Core functionality | Free; no feature paywalls |
| Source code | Public and open source |
| Self-hosting | Permitted under the open-source license |
| Subscriptions | None |
| Paid feature tiers | None |
| Advertisements | None |
| Sale of user data | Prohibited |
| Donations | Optional and voluntary |

A donation must never unlock functionality, increase limits, grant privileged access, change product permissions or determine the priority of an individual user's requests.

## 3. Proposed software license

**Proposed license: GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later).**

The proposal is to apply the license consistently to the BuildTrace application and backend source code, subject to a repository-wide license review before the first public release.

The final licensing audit must:

- Verify compatibility of direct and transitive dependencies.
- Review bundled icons, fonts, illustrations, documentation assets and other non-code materials separately.
- Publish required copyright notices and third-party license notices.
- Review distribution requirements for browser delivery, Android packages and iOS distribution.
- Confirm that any hosted modifications and source-availability obligations are handled correctly.

AGPL-3.0-or-later is a proposal, not a substitute for legal and dependency review. If a material compatibility issue is found, document it and revisit the license before release rather than silently mixing incompatible terms.

Do not add the final `LICENSE` file until this review is complete.

## 4. Funding model: voluntary donations

The proposed funding source is voluntary community support. Possible donation channels may be evaluated later; no platform is selected yet.

Donations may help cover:

- Official hosting and database infrastructure.
- Object storage, backups and bandwidth.
- Build, signing and release infrastructure.
- Security maintenance and incident response.
- Development tooling and ongoing project maintenance.

Donors receive no exclusive features or service privileges. The application remains the same for donors and non-donors.

## 5. Official hosted service

The intended official hosted service is free to use and supported by donations.

Free access does not mean unlimited infrastructure. Hosting, storage, bandwidth, backups and distribution have real costs. The maintainers must publish sensible capacity and availability boundaries and must not promise unlimited usage without a sustainable funding basis.

If funding becomes insufficient, maintainers should communicate the operational problem clearly and prioritize export, portability and a safe route to self-hosting. They should not quietly introduce paid feature tiers or hold user data behind a payment demand.

## 6. Self-hosted deployments and infrastructure costs

The software should remain self-hostable. A person or organization running their own instance chooses and operates its own infrastructure.

A self-hosting operator may incur charges from their selected cloud, database, storage, email or network providers. Those are infrastructure costs paid to the operator's chosen vendors; they are not BuildTrace subscriptions or license fees.

The official hosted service may also pay infrastructure vendors. Such operating expenses are funded through donations or other transparent non-paywall support, not by charging users for core functionality.

## 7. AI and third-party services

Core project creation, record capture, history, archive, export and resumption must work without a paid AI API or mandatory paid third-party integration.

AI remains optional. Local models are a suitable direction to investigate. Any optional external provider must be clearly identified before use; a provider may set its own terms or fees, but BuildTrace must not make that provider necessary for basic product use.

BuildTrace must not represent an optional third-party provider's service as free when that provider charges for it.

## 8. Privacy and user ownership

- Private project content must not be sold or shared for advertising.
- Do not build advertising identifiers, behavioural ad profiles or third-party ad tracking into the applications.
- Keep projects private by default.
- Provide documented export and account-deletion workflows.
- Explain backup retention and deletion timing.
- Keep self-hosted and hosted data portable through documented formats.

## 9. Governance and transparency

Funding must not undermine the product's free/open-source commitment. When donation channels are selected, document what they support and provide a reasonable level of transparency around operating costs and project maintenance.

Donation amounts must not determine roadmap voting rights, code-merge authority or privileged data access. Project governance should follow the published contribution and maintainer policies.

## 10. Release checklist

- [ ] AGPL-3.0-or-later license text and scope reviewed.
- [ ] Dependency, bundled-asset and distribution-channel license audit completed.
- [ ] Third-party notices and contribution guidance published.
- [ ] No subscriptions, paid tiers, ads, data sales or billing entitlements in the product.
- [ ] Core workflows tested without paid AI or mandatory paid integrations.
- [ ] Self-hosting, export, backup and account-deletion instructions published.
- [ ] Official hosted-service limits and funding constraints disclosed before public use.

## 11. Current decisions and open operational details

| Item | Status |
| --- | --- |
| Free/open-source product direction | Approved |
| Voluntary donations as the funding model | Approved |
| No ads, subscriptions or paid feature tiers | Approved |
| No sale of user data | Approved |
| AGPL-3.0-or-later | Proposed; final audit required |
| Donation platform | Not selected |
| Official hosting direction | Render staging; NEXVARIN intended production target |
| NEXVARIN production readiness | Subject to infrastructure acceptance |
| Hosting capacity and service limits | To be established before hosted launch |
| Public governance/contribution process | To be documented before public release |
