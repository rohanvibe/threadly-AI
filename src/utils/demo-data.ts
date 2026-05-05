import { Message } from '@/app/page'

export const DEMO_CONVERSATION: Message[] = [
  {
    id: 'demo-1',
    chat_id: 'demo-chat',
    role: 'user',
    content: "I'm looking to design a sustainable energy grid for a 10,000-person lunar base. What are the core pillars of such an infrastructure?",
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  },
  {
    id: 'demo-2',
    chat_id: 'demo-chat',
    role: 'assistant',
    content: "Designing for the lunar environment requires a fundamentally different approach than Earth-based systems due to the 14-day lunar night, extreme temperature swings, and radiation levels. \n\n### 🔋 Core Pillars of Lunar Energy Infrastructure\n\n1.  **Dual-Mode Power Generation**: Hybridizing Vertical Solar Arrays (to capture low-angle light) with Micro-Nuclear Reactors (KRUSTY-type) for baseload reliability.\n2.  **Regenerative Fuel Cell (RFC) Storage**: Converting water into hydrogen and oxygen during the day, and recombining them at night for high-density energy release.\n3.  **Superconducting Distribution**: Taking advantage of the ambient cold (70K - 100K) to create near-zero loss energy transmission.\n4.  **Heat Management Systems**: Using large radiator arrays to shed excess thermal energy into the vacuum of space.\n\nWould you like to see a breakdown of the estimated power requirements for a colony of this scale?",
    created_at: new Date(Date.now() - 1000 * 60 * 55).toISOString()
  },
  {
    id: 'demo-3',
    chat_id: 'demo-chat',
    role: 'user',
    content: "Yes, break down the power budget and show me the math for the fuel cell storage capacity needed for the 14-day night.",
    created_at: new Date(Date.now() - 1000 * 60 * 50).toISOString()
  },
  {
    id: 'demo-4',
    chat_id: 'demo-chat',
    role: 'assistant',
    content: "For 10,000 people, we estimate a baseline requirement of **50 MW** (5 kW per person, accounting for life support, industrial processing, and research).\n\n### 📊 Power Budget Allocation\n- **Life Support & Habitat**: 15 MW\n- **Oxygen/Water Extraction**: 20 MW\n- **Research & Mobility**: 5 MW\n- **Contingency/Reserves**: 10 MW\n\n### 🔢 Night-Time Storage Calculation\nThe lunar night lasts approximately 354 hours. To sustain 50 MW continuously:\n\n```calculator\n50000 * 354\n```\n\nThis gives us a total storage requirement of **17,700 MWh**. \n\nUsing high-efficiency Hydrogen Fuel Cells ($2 kWh/kg$), we can calculate the necessary mass of reactants:\n\n$$Mass_{H_2} = \\frac{Total\\,Energy}{Specific\\,Energy} = \\frac{17,700,000}{2} = 8,850,000\\,kg$$\n\nThat's roughly 8,850 tons of reactants. Here is a high-level visual of what the RFC system looks like:",
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    images: [
      {
        url: 'https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Advanced lunar power station and habitat modules',
        width: 1260,
        height: 750
      }
    ]
  },
  {
    id: 'demo-5',
    chat_id: 'demo-chat',
    role: 'user',
    content: "Can you create a diagram of the energy flow from the solar arrays to the distribution grid?",
    created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString()
  },
  {
    id: 'demo-6',
    chat_id: 'demo-chat',
    role: 'assistant',
    content: "Certainly. This diagram outlines the redundant energy path from primary generation to the secondary storage and final distribution hubs.\n\n```mermaid\ngraph TD\n    SA[Vertical Solar Arrays] -->|DC Power| BC[Bus Controller]\n    NR[Micro-Nuclear Baseload] -->|AC/DC Conversion| BC\n    BC -->|Surplus| RFC[Regenerative Fuel Cells]\n    BC -->|Direct Load| PDH[Primary Distribution Hub]\n    RFC -->|Night Discharge| PDH\n    PDH --> Hab[Habitation Modules]\n    PDH --> Ind[Industrial O2 Processing]\n    PDH --> Res[Research Facilities]\n    \n    subgraph Monitoring\n    BC --- AI[AI Grid Manager]\n    end\n```\n\nThis setup ensures that even during a primary failure, the base can operate on critical life support for up to 72 hours using the contingency reserves.",
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString()
  },
  {
    id: 'demo-7',
    chat_id: 'demo-chat',
    role: 'user',
    content: "What about the 14-day temperature swing? How do we protect the distribution hubs?",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: 'demo-8',
    chat_id: 'demo-chat',
    role: 'assistant',
    content: "The temperature on the Moon varies from **120°C** in the day to **-170°C** at night. This thermal stress is the primary cause of hardware fatigue.\n\n### ❄️ Thermal Protection Strategy\n1.  **Regolith Sintering**: We bury the hubs under 3-5 meters of lunar regolith, which acts as a near-perfect insulator.\n2.  **Phase Change Materials (PCM)**: Using paraffin or hydrated salts to absorb excess heat during the day and release it at night to maintain a stable internal temperature of 15°C - 25°C.\n3.  **Active Cooling Loops**: Ammonia-based heat pipes connected to vertical radiator panels shaded from the sun.\n\nHere's a concept of the underground distribution facility:",
    created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    images: [
      {
        url: 'https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Cross-section of a lunar underground facility',
        width: 1260,
        height: 750
      }
    ]
  },
  {
    id: 'demo-9',
    chat_id: 'demo-chat',
    role: 'user',
    content: "Let's pivot to the industrial processing. How much oxygen can we produce with that 20 MW allocation?",
    created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString()
  },
  {
    id: 'demo-10',
    chat_id: 'demo-chat',
    role: 'assistant',
    content: "Using the **Molten Salt Electrolysis** of regolith, we can produce oxygen as a primary product. On average, it takes about $50 kWh$ of energy to produce $1 kg$ of Oxygen.\n\nWith a 20 MW allocation:\n\n```calculator\n20000 / 50\n```\n\nThat's **400 kg of Oxygen per hour**, or 9,600 kg per day. \n\nFor a colony of 10,000, assuming a usage of 0.84 kg per person per day, the requirement is 8,400 kg. This means our 20 MW allocation provides a healthy surplus for industrial reserve tanks.",
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: 'demo-11',
    chat_id: 'demo-chat',
    role: 'user',
    content: "Impressive. Can you summarize the entire lunar energy and industrial strategy in a few high-level points?",
    created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString()
  },
  {
    id: 'demo-12',
    chat_id: 'demo-chat',
    role: 'assistant',
    content: "The strategy focuses on **Self-Sufficiency** and **Resilience**. By leveraging local resources (Regolith for O2 and insulation) and diverse energy generation (Solar + Nuclear), the colony can withstand the harsh lunar environment indefinitely.\n\n### 🚀 High-Level Strategy Summary\n- **Hybrid Generation**: Constant baseload from Nuclear + Peak production from Solar.\n- **Chemical Storage**: RFCs to solve the 14-day night problem.\n- **Local Resource Utilization**: 9.6 tons of O2 produced daily from lunar soil.\n- **Deep-Shielding Architecture**: Protecting electronics under regolith layers.\n\nThis blueprint provides the backbone for long-term human presence beyond Earth orbit.",
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString()
  }
];

export const DEMO_SIDEBAR_ITEMS = [
  { id: 'demo-1', label: '1. Project Overview', targetId: 'demo-1' },
  { id: 'demo-3', label: '2. Night Calculations', targetId: 'demo-3' },
  { id: 'demo-5', label: '3. Energy Flow Diagram', targetId: 'demo-5' },
  { id: 'demo-7', label: '4. Thermal Protection', targetId: 'demo-7' },
  { id: 'demo-9', label: '5. O2 Production Stats', targetId: 'demo-9' },
  { id: 'demo-11', label: '6. Final Blueprint', targetId: 'demo-11' }
];
