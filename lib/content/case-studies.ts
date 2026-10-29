// English case studies. Facts follow the approved master CV and interview clarifications.
import type { CaseStudySection } from "./projects";

export type ProjectCaseStudy = { en?: CaseStudySection[]; vi?: CaseStudySection[] };

export const caseStudies: Record<string, ProjectCaseStudy> = {
  "inno2-nea-wastewater": {
    "en": [
      {
        "heading": "Problem and scope",
        "body": [
          "Changing a wastewater sampler’s collection schedule required a site visit. Our team built the IoT solution from scratch so operators could change settings remotely and monitor conditions such as temperature.",
          "I worked on the SP/W2 project and continued as a freelance IoT Solutions Consultant with W2. I gathered requirements through discussions with W2’s team, which supported the NEA wastewater-sampling programme.",
          "The platform involved more than 100 RTUs during my involvement and reached roughly 50 sites by the end of my engagement. Deployment expanded beyond 360 sites after I left."
        ]
      },
      {
        "heading": "My contribution",
        "bullets": [
          "Set up the Azure VM and integrated SIM-equipped Tastek RTUs with the Mosquitto MQTT broker and web dashboard.",
          "Worked with the team on dashboard SSL certificates and the wider monitoring and control solution."
        ]
      },
      {
        "heading": "Implementation and operating trade-off",
        "bullets": [
          "A single Azure VM hosted Mosquitto, the database and the web dashboard.",
          "RTU onboarding involved physically connecting each unit to a computer and configuring it to communicate with the Azure VM over cellular.",
          "We accommodated growing demand by vertically resizing the VM. Each resize required a brief stop and restart.",
          "The wider system used Twilio WhatsApp alerts for faults and threshold events."
        ]
      },
      {
        "heading": "Wider programme",
        "body": [
          "[The Straits Times](https://www.straitstimes.com/singapore/wastewater-surveillance-sites-for-covid-19-to-double-by-2022-from-current-200-nea) reported on the wider NEA surveillance programme. The article provides programme context."
        ]
      }
    ]
  },
  "esmos-multi-cloud": {
    "en": [
      {
        "heading": "Coursework context",
        "body": [
          "ESMOS was a fictional regional healthcare provider used for IS214 coursework at SMU. The brief covered APAC expansion, availability, disaster recovery and data sovereignty."
        ]
      },
      {
        "heading": "Architecture and my contribution",
        "bullets": [
          "Developed the architecture, produced the diagram and authored the Service Design Document, connecting service choices to the brief and recovery runbook.",
          "Designed a regional architecture spanning AWS in Singapore, Tokyo and Sydney, with Azure East Asia in Hong Kong for cross-cloud recovery.",
          "Compared Aurora Global Database with manual replication, explaining managed replication and failover alongside vendor dependence.",
          "Explained how cross-cloud recovery addressed the single-vendor failure scenario, including the additional cost and operational complexity.",
          "Designed geo-routing and failover behaviour around the scenario’s requirements."
        ]
      },
      {
        "heading": "Implementation with the team",
        "bullets": [
          "Deployed the AWS/Azure environment using Terraform and AI-assisted development.",
          "Deployed Odoo on AWS EKS and set up the Azure AKS recovery environment and an always-active Odoo Helpdesk service on Azure.",
          "Configured Aurora Global Database for cross-region replication.",
          "Configured Cloudflare and GCP Cloud DNS to reduce reliance on a single DNS provider.",
          "Configured Cloudflare R2 for cold archival and Azure Blob Storage for Helpdesk backups.",
          "Deployed Moodle on EC2 in an Auto Scaling Group and configured WireGuard for staff access.",
          "Built an S3, Lambda and MediaConvert video-processing pipeline with HLS delivery through the Cloudflare CDN.",
          "Implemented a /healthz write-validation gate before routing traffic to Azure recovery.",
          "Configured Cloudflare WAF, DDoS protection, CDN and TLS.",
          "Configured CloudWatch Container Insights, cross-region visibility and SNS email alerts."
        ]
      },
      {
        "heading": "Monitoring, demonstration and presentation",
        "bullets": [
          "Configured BetterStack external uptime monitoring using the application hostname.",
          "Demonstrated geo-routing and regional failover by taking one region down and showing traffic moving to another.",
          "Presented the architecture and explained the service choices."
        ]
      },
      {
        "heading": "Reading the diagram",
        "body": [
          "The original coursework diagram includes design targets and recovery assumptions. The team deployed and demonstrated the stack, but the diagram’s recovery targets are not measured recovery-time results."
        ]
      }
    ]
  },
  "osiris-hydroponics": {
    "en": [
      {
        "heading": "Problem and pilot scope",
        "body": [
          "SME operators and hydroponics solution providers needed a way to monitor racks and control lighting and irrigation remotely. We tested the switch boxes on demonstration racks during early pre-revenue pilots."
        ]
      },
      {
        "heading": "Hardware, firmware and cloud work",
        "bullets": [
          "Built and soldered switch-box prototypes using ESP32 controllers, DHT22 sensors and relays.",
          "Wrote MicroPython firmware to operate relay-connected equipment through standard socket panels.",
          "Implemented local daily schedules so lighting and irrigation cycles could continue when the cloud was unavailable.",
          "Configured telemetry over Wi-Fi and MQTT through HiveMQ Cloud to AWS S3.",
          "Recorded prototype hardware specifications to support a transition toward PCB design."
        ]
      },
      {
        "heading": "Venture and stakeholder work",
        "bullets": [
          "Co-founded Osiris and recruited the core SMU team, dividing hardware, firmware and cloud responsibilities.",
          "Demonstrated dashboard-based monitoring and remote lighting and irrigation control with the team.",
          "Presented the BIG grant pitch. The venture received grant support and SMU incubation.",
          "Demonstrated remote hydroponic control to visitors at the World Cities Summit 2024 SMU IIE booth.",
          "Discussed initial requirements and potential construction IoT/SIDS applications with a construction-industry company."
        ]
      },
      {
        "heading": "Public coverage",
        "body": [
          "Osiris was included in [Singapore Business Review](https://sbr.com.sg/markets-investing/exclusive/meet-9-singapore-students-promising-business-ventures)’s feature on student entrepreneurs from several institutions."
        ]
      }
    ]
  },
  "becalearn": {
    "en": [
      {
        "heading": "Problem and initiative",
        "body": [
          "Intern onboarding relied on scattered learning materials and Excel-based instructions. I initiated BecaLearn outside the internship brief to centralise documentation, video links and guidance on what new interns needed to learn."
        ]
      },
      {
        "heading": "My contribution",
        "bullets": [
          "Designed the application architecture for VNTT’s internal data-centre hosting and prepared Docker Compose deployment configuration.",
          "Built the initial LMS using AI-assisted development.",
          "Prepared the proposal and gained stakeholder support.",
          "Assigned page reviews and user acceptance testing of business flows to another intern.",
          "Reviewed the testing feedback and implemented selected improvements."
        ]
      },
      {
        "heading": "Deployment testing and handover",
        "body": [
          "Handed over the codebase and Docker Compose configuration after deployment testing to support internal hosting and future development."
        ]
      }
    ]
  },
  "vntt-industrial-gateway": {
    "en": [
      {
        "heading": "Integration problem",
        "body": [
          "Built and tested an EdgeX Foundry gateway prototype to consolidate readings from different industrial protocols for monitoring."
        ]
      },
      {
        "heading": "My implementation",
        "bullets": [
          "Built an EdgeX Foundry gateway prototype with simulated Modbus TCP, MQTT and Siemens S7 inputs.",
          "Integrated custom device services with Python sensor simulators in an 18-container Docker environment.",
          "Applied deadband filtering, enrichment and classification to prepare sensor readings for downstream monitoring.",
          "Configured TLS publishing to HiveMQ for the gateway-to-cloud MQTT path.",
          "Used InfluxDB and Grafana to inspect sensor data flowing through the prototype."
        ]
      },
      {
        "heading": "Scope and related exposure",
        "body": [
          "Separately, I used AI-assisted coding to map stacker-crane actions to device command codes for higher-level warehouse controls. I learned about AS/RS stacker cranes, shuttles and lifters, and received a walkthrough of a building’s smart parking hardware and licence-plate lookup kiosk."
        ]
      }
    ]
  },
  "ntuc-workstation-automation": {
    "en": [
      {
        "heading": "Problem",
        "body": [
          "Computer setup involved repetitive manual software installation and configuration. Asset details also had to be recorded manually."
        ]
      },
      {
        "heading": "Provisioning used by the IT team",
        "bullets": [
          "Automated software installation, configuration and domain joining using custom Windows images and PowerShell.",
          "Created bootable Windows installation media using Rufus.",
          "Reduced hands-on setup effort from more than 45 minutes to under 10 minutes per computer. This measures staff effort rather than total installation time.",
          "Shared the images and scripts with IT colleagues who used them for workstation setup, and trained a colleague to use them."
        ]
      },
      {
        "heading": "Asset records and support",
        "bullets": [
          "Built a Python/MySQL workflow to collect MAC addresses, IP addresses and NetBIOS names into a central asset database, replacing manual entry for the IT team.",
          "Created and managed Active Directory user accounts and provided day-to-day IT support."
        ]
      },
      {
        "heading": "Additional proof of concept",
        "body": [
          "Demonstrated automatic software installation through Chocolatey for Business so the IT team could evaluate another deployment option. This remained a proof of concept."
        ]
      }
    ]
  },
  "singapore-indoor-farms": {
    "en": [
      {
        "heading": "Purpose and contribution",
        "body": [
          "Built a Raspberry Pi rig for one hydroponic demonstration rack so the farm’s team could show clients live monitoring and control during facility walkthroughs. This was a freelance W2 project."
        ]
      },
      {
        "heading": "Implementation",
        "bullets": [
          "Connected DHT22 humidity and separate CO2 sensors through Raspberry Pi GPIO.",
          "Added Raspberry Pi camera monitoring.",
          "Controlled grow lights and a water pump through relays.",
          "Integrated readings, equipment controls and simple notifications into a monitoring interface for demonstrations."
        ]
      }
    ]
  },
  "royce-connect": {
    "en": [
      {
        "heading": "Coursework and product framing",
        "body": [
          "I led the proposal, framing appointment no-shows and recall conversion as a product opportunity for the team’s chosen case company, Royce Dental.",
          "Applied SWOT, Porter’s Five Forces and market sizing to support the proposal."
        ]
      },
      {
        "heading": "My contribution with the team",
        "bullets": [
          "Designed patient appointment and recall-reminder workflows.",
          "Developed workflows for managers to review retention and no-show patterns across outlets.",
          "Contributed to the React Native patient app and Next.js/TypeScript operations dashboard.",
          "Used Figma Make for UI work and Vercel for operations-dashboard deployment.",
          "Created most of the presentation deck to explain the problem, proposed features and operating model."
        ]
      },
      {
        "heading": "Project scope",
        "body": [
          "The product proposal, patient app and operations-dashboard demonstrations were IS215 coursework deliverables."
        ]
      }
    ]
  },
  "signpost-collective-dashboard": {
    "en": [
      {
        "heading": "Project context",
        "body": [
          "An SMU-X project for COR1301 Leadership and Team Building. Signpost Collective already had an internal dashboard. Our team built a reference dashboard for volunteer operations."
        ]
      },
      {
        "heading": "My contribution with the team",
        "bullets": [
          "Co-developed the Next.js/TypeScript reference dashboard for volunteer operations.",
          "Implemented admin/member permissions to control viewing and editing access.",
          "Developed analytics views.",
          "Used Figma Make for UI design and Vercel for deployment."
        ]
      },
      {
        "heading": "Delivery",
        "body": [
          "Shared the reference-dashboard codebase with Signpost Collective."
        ]
      }
    ]
  },
  "grabcompare": {
    "en": [
      {
        "heading": "Problem and deliverables",
        "body": [
          "GrabCompare proposed a single experience for comparing ride-hailing prices and waiting times across providers including Grab and Tada. The work was for the SMU Product Management Club’s internal product challenge."
        ]
      },
      {
        "heading": "My contribution with the team",
        "bullets": [
          "Identified the problem, researched alternatives and developed the business case.",
          "Co-designed a Figma prototype showing the comparison experience.",
          "Co-authored the research documentation and product proposal.",
          "Prepared presentation slides and presented the proposal."
        ]
      },
      {
        "heading": "Result",
        "body": [
          "Our team placed first in the internal challenge in October 2023."
        ]
      }
    ]
  },
  "asv-5g-autonomous": {
    "en": [
      {
        "heading": "Capstone context",
        "body": [
          "The vehicle was a multidisciplinary SP project involving autonomy, mechatronics, controls and IoT teams. I worked in the five-intern IoT team, mainly on cloud and dashboard integration, with additional Raspberry Pi and Node-RED contributions."
        ]
      },
      {
        "heading": "Telemetry and integration",
        "bullets": [
          "Integrated cloud components and the React/Node.js/MySQL dashboard for live vehicle-status and sensor readings.",
          "Contributed to the Node-RED flows on the onboard Raspberry Pi, publishing telemetry over MQTT.",
          "The Pi connected by Ethernet to a 5G router using SP’s dedicated 5G network.",
          "The team captured GPS, battery status, temperature, humidity and CO2 readings.",
          "Integrated telemetry with DECADA for storage. The monitoring dashboard was a separate component."
        ]
      },
      {
        "heading": "Demonstration",
        "body": [
          "Demonstrated the IoT subsystem at SP Engineering Show 2021 and explained how data travelled from the vehicle to the dashboard."
        ]
      }
    ]
  },
  "nepseeds": {
    "en": [
      {
        "heading": "Business and role",
        "body": [
          "I co-founded Nepseeds in July 2021 and continue to handle operations part-time. The business primarily sells Nepenthes seeds, with occasional live-plant shipments."
        ]
      },
      {
        "heading": "Storefront and fulfilment",
        "bullets": [
          "Manage the Shopify storefront, orders and customer enquiries.",
          "Manage international shipping, fulfilment and tracking.",
          "Coordinate with NParks on phytosanitary certification where required.",
          "Trained the business partner to add products in Shopify so either of us could update the catalogue."
        ]
      },
      {
        "heading": "Automation and community",
        "bullets": [
          "Implemented an AI-assisted order-triggered script that sends shipping labels and order/packing slips to a printer, removing the need to start each print job manually.",
          "Publish Facebook and Instagram posts using Meta Business Suite.",
          "Grew the Facebook group organically to approximately 1,500 members through posts and responsive customer communication."
        ]
      }
    ]
  },
  "seagate-lyve-cloud": {
    "en": [
      {
        "heading": "Hackathon contribution",
        "body": [
          "The team placed fourth in the Seagate Lyve Cloud Hackathon in 2022."
        ]
      }
    ]
  },
  "windows-server-2000-security": {
    "en": [
      {
        "heading": "Lab work",
        "body": [
          "Evaluated a Windows Server 2000 baseline using security probes, applied DNS, IIS, password and remote-access controls, then repeated the probes to compare behaviour."
        ]
      },
      {
        "heading": "Implementation and tools",
        "bullets": [
          "VMware Workstation hosted the lab environment.",
          "Used IIS Lockdown to reduce unused IIS features.",
          "Used CopSSH for remote access and Group Policy for password and lockout controls.",
          "Used Nmap, nslookup and probing scripts for before-and-after checks."
        ]
      }
    ]
  },
  "cisco-wan-architecture": {
    "en": [
      {
        "heading": "Lab work and contribution",
        "body": [
          "Led a three-person team building a simulated hub-and-spoke WAN connecting headquarters and three branches in Cisco Packet Tracer Multi-User."
        ]
      },
      {
        "heading": "Configuration",
        "bullets": [
          "Integrated RIPv2 routing, PPP authentication, DHCP and standard/extended ACLs.",
          "Used hierarchical addressing within 172.23.0.0/16.",
          "Configured routers and switches using the Cisco IOS CLI within the simulated topology."
        ]
      }
    ]
  },
  "windows-server-2012-r2-enterprise": {
    "en": [
      {
        "heading": "Lab work and contribution",
        "body": [
          "Led a three-person team building a four-VM Windows Server 2012 R2 environment for a fictional sports facility."
        ]
      },
      {
        "heading": "Configuration",
        "bullets": [
          "Configured Active Directory, organisational units, role-based policies, quotas and cross-server authentication for more than 50 accounts.",
          "Used VMware Workstation for the virtual machines and PowerShell for bulk user provisioning.",
          "Worked across domain, DNS/DHCP, file and web-server roles."
        ]
      }
    ]
  },
  "cisco-enterprise-lan": {
    "en": [
      {
        "heading": "Lab work and contribution",
        "body": [
          "Led a three-person team integrating VLSM addressing, OSPF routing and ACL access controls."
        ]
      },
      {
        "heading": "Physical configuration",
        "bullets": [
          "Designed the network in Cisco Packet Tracer.",
          "Configured physical routers and switches in the SP lab to implement the design across seven routers, five switches, more than 12 endpoints and two servers.",
          "Used the Cisco IOS CLI for configuration."
        ]
      }
    ]
  }
};
