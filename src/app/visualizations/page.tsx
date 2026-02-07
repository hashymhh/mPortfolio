import DependencyGraph from "../../components/visualizations/dependency-graph";
import NetworkMesh from "../../components/visualizations/network-mesh";
import SystemArchitecture from "../../components/visualizations/system-architecture";
import Navbar from "../../components/Navbar";

const VisualizationPage = () => {
    return (
        <div className="w-full min-h-screen bg-[var(--backgroundColor)] text-[#eae5ec] font-['Geist']">
            <Navbar />

            <div className="container-main pt-32 pb-20 px-4 md:px-10">
                <div className="section-container mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Security Visualizations</h1>
                    <p className="text-lg text-gray-400 mb-12 max-w-2xl">
                        Real-time graphical representations of security concepts, simulating attack lifecycles, distributed networks, and system architectures.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Dependency Graph */}
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 hover:border-[var(--accentColor)] transition-colors">
                            <h2 className="text-2xl font-bold mb-4">Supply Chain Attack Cycle</h2>
                            <DependencyGraph />
                            <p className="mt-4 text-sm text-gray-500">
                                Simulates an attack propagating through build pipeline stages, detection, and mitigation.
                            </p>
                        </div>

                        {/* Network Mesh */}
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 hover:border-[var(--accentColor)] transition-colors">
                            <h2 className="text-2xl font-bold mb-4">Federated Network Mesh</h2>
                            <NetworkMesh />
                            <p className="mt-4 text-sm text-gray-500">
                                Visualizes a decentralized network with nodes reporting to a central aggregator.
                            </p>
                        </div>
                    </div>

                    {/* System Architecture */}
                    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 hover:border-[var(--accentColor)] transition-colors">
                        <h2 className="text-2xl font-bold mb-4">System Architecture Flow</h2>
                        <SystemArchitecture />
                        <p className="mt-4 text-sm text-gray-500">
                            Demonstrates full-stack data flow from Frontend to API to Database.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualizationPage;
