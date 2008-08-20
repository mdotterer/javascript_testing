
namespace :test do
  desc "Runs all the JSSpec tests and collects the results"
  task :jsspec do
    Dir.chdir("spec/javascripts") do
      all_fine = true
      files = ENV["TEST"] ? ENV["TEST"] : Dir.glob("*_spec.js").join(" ")
      all_fine = false unless system("java -jar ./rhino/js.jar ./jsspec/runner.js #{files}")
      raise "JSSpec test failures" unless all_fine
    end
  end
  namespace :jsspec do
    desc "Compiles all the JSSpec tests into an html file that can be run in the browser"
    task :compile do
      Dir.chdir("spec/javascripts") do
        files = ENV["TEST"] ? ENV["TEST"] : Dir.glob("*_spec.js").join(" ")
        system("java -jar ./rhino/js.jar ./jsspec/compiler.js #{files}")
      end
    end
  end
end

# Uncomment this to add jsspec tests to your Cruise Control task
# [:test, :cruise].each do |taskname|
#   task taskname do
#     exceptions = ["test:jsspec"].collect do |task|
#       puts "Beginning JSSpec test suite..."
#       begin
#         Rake::Task[task].invoke
#         nil
#       rescue => e
#         e
#       end
#     end.compact
#
#     exceptions.each {|e| puts e }
#     raise "Test failures" unless exceptions.empty?
#   end
# end
